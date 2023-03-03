import * as React from 'react';
import { Admin, CustomRoutes, Resource, ListGuesser } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { Route } from 'react-router';

import authProvider from './authProvider';
import { Login, Layout } from './layout';
import { Dashboard } from './dashboard';
import englishMessages from './i18n/en';
import { lightTheme } from './layout/themes';

import visitors from './visitors';
import orders from './orders';
import loanRequest from './loanRequest';
import products from './products';
import invoices from './invoices';
import categories from './categories';
import reviews from './reviews';
import dataProviderFactory from './dataProviderold';
import dataProvider from './dataProvider/dataProvider';
import Configuration from './configuration/Configuration';
import Segments from './segments/Segments';
import jsonServerProvider from "ra-data-json-server";
import { fetchUtils } from "react-admin";

const i18nProvider = polyglotI18nProvider(locale => {
    if (locale === 'fr') {
        return import('./i18n/fr').then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
}, 'en');

//const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const httpClient = (url:any, options = {headers:{}}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers = new Headers({Authorization : `Bearer ${token}`});
    return fetchUtils.fetchJson(url, options);
};

const App = () => (
    <Admin
        title=""
        dataProvider={dataProvider("https://localhost:7017", httpClient)}
        authProvider={authProvider}
        dashboard={Dashboard}
        loginPage={Login}
        layout={Layout}
        i18nProvider={i18nProvider}
        disableTelemetry
        theme={lightTheme}
    >
        <CustomRoutes>
            <Route path="/configuration" element={<Configuration />} />
            <Route path="/segments" element={<Segments />} />
        </CustomRoutes>
        <Resource name="customers" {...visitors} />
        <Resource name="loanRequest" {...loanRequest} />
        <Resource name="commands" {...orders} options={{ label: 'Orders' }} />
        <Resource name="invoices" {...invoices} />
        <Resource name="products" {...products} />
        <Resource name="categories" {...categories} />
        <Resource name="reviews" {...reviews} />
    </Admin>
);

export default App;
