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



// TypeScript users must reference the type `DataProvider`
export default (
    apiUrl: string,
    httpClient = fetchUtils.fetchJson,
    countHeader: string = 'Content-Range',    
): DataProvider => ({

    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        var res = getResource(resource);
        const rangeStart = (page - 1) * perPage;
        const rangeEnd = page * perPage - 1;

        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([rangeStart, rangeEnd]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${res + "/Get"}?${stringify(query)}`;
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

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${getResource(resource) + "/Get"}/${params.id}`).then(({ json }) => ({
            data: json.value,
        })),

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

    create: (resource, params) =>
        httpClient(`${apiUrl}/${getResource(resource) + "/Create"}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

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