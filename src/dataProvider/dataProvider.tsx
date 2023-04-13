import { stringify } from "query-string";
import { fetchUtils, DataProvider } from 'ra-core';
import { useNavigate } from 'react-router-dom';

const apiUrl = 'https://my.api.com/';
const httpClient = fetchUtils.fetchJson;


const getResource = (resource: string) => {
    switch (resource) {
        case 'customers':
            return 'Customer';

        case 'categories':
            return 'Category';

        case 'commands':
            return 'Command';

        case 'products':
            return 'Product';

        case 'reviews':
            return 'Review';

        case 'loanRequest':
            return 'LoanRequest';    

        case 'invoices':
            return 'Invoice';

        default:
            throw new Error(`Unknown resource ${resource}`);
    }
};

const toBase64 = (file:any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

// function getBase64(file:any) {
//     var reader = new FileReader();
//     reader.readAsDataURL(file.rawFile);
//     reader.onload = function () {
//       reader.result;
//     };
//     reader.onerror = function (error) {
//       console.log('Error: ', error);
//     };
//  }
const convertFileToBase64 = (file:any) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file.rawFile);
    });

// const convertFileToBase64 = (file:any) => {

//         const reader = new FileReader();
//         reader.onload = function(){
//            file.src = reader.result;
//         }
//         reader.readAsDataURL(file.rawFile);
// }

const checkAttachment = async (data:any) =>{
    if(!data.attachments || data.attachments === undefined) return data;
    await Promise.all(data.attachments.map(async (item:any) => {
        await convertFileToBase64(item).then((base64:any)=>{
            item.src = base64;
        })
    }))
    return data;
}

const getServerUrl = ()=>{
    return fetch('config.json').then((res)=>res.json()).then(async (data)=>{
    return data;
   })
}
const getUrl = async () =>{
    var data = await getServerUrl();
    var url = data.SERVER_URL;
    return url;
}

// TypeScript users must reference the type `DataProvider`
export default (
    //apiUrl: string,
    httpClient = fetchUtils.fetchJson,
    countHeader: string = 'Content-Range',    
): DataProvider => ({

    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        var serverUrl = await getUrl();
        var res = getResource(resource);
        const rangeStart = (page - 1) * perPage;
        const rangeEnd = page * perPage - 1;

        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([rangeStart, rangeEnd]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${serverUrl}/${res + "/Get"}?${stringify(query)}`;
        const token = localStorage.getItem('token');
    
        const options =
            countHeader === 'Content-Range'
                ? {
                      headers: new Headers({
                          Range: `${resource}=${rangeStart}-${rangeEnd}`,
                      }),
                                           
                  }
                : {};                                    
        return httpClient(url, options).then((response) => {           
            return {
                data: response.json.value,
                total: response.json.value.length           
            };
        }).catch((reason:any)=>{
            localStorage.removeItem('username');
            return{
                data:[],
                total:0
            }

        });
    },

    getOne: async (resource, params) =>{
        var serverUrl = await getUrl();

        return httpClient(`${serverUrl}/${getResource(resource) + "/Get"}/${params.id}`).then(({ json }) => ({
            data: json.value,
        }))},

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}`;
        return httpClient(url, {
            method: 'POST',
            body: JSON.stringify(query)
        }).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const rangeStart = (page - 1) * perPage;
        const rangeEnd = page * perPage - 1;

        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const options =
            countHeader === 'Content-Range'
                ? {
                      // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
                      headers: new Headers({
                          Range: `${resource}=${rangeStart}-${rangeEnd}`,
                      }),
                  }
                : {};

        return httpClient(url, options).then(({ headers, json }) => {
            if (!headers.has(countHeader)) {
                throw new Error(
                    `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`
                );
            }
            return {
                data: json,
                total:
                    countHeader === 'Content-Range'
                        ? parseInt(
                              headers.get('content-range')!.split('/').pop()!,
                              10
                          )
                        : parseInt(headers.get(countHeader.toLowerCase())!),
            };
        });
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    // simple-rest doesn't handle provide an updateMany route, so we fallback to calling update n times instead
    updateMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                })
            )
        ).then(responses => ({ data: responses.map(({ json }) => json.id) })),

        create: async (resource, params) => {
            var serverUrl = await getUrl();
            return httpClient(`${serverUrl}/${getResource(resource) + "/Create"}`, {
                method: 'POST',
                body: JSON.stringify(await (checkAttachment(params.data))),
            }).then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }))
        },

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    deleteMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'DELETE',
                })
            )
        ).then(responses => ({ data: responses.map(({ json }) => json.id) })),
});