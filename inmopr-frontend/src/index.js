import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa desde 'react-dom/client'
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import * as serviceWorker from './serviceWorker';
import configureStore from './store';
import { App } from './modules/app';
import backend from './backend';
import app from './modules/app';
import {NetworkError} from './backend';
import {initReactIntl} from './i18n';
import { PersistGate } from 'redux-persist/integration/react';


/* Configure store. */
const { store, persistor } = configureStore();


/* Configure backend proxy. */
backend.init(error => store.dispatch(app.actions.error(new NetworkError())));

/* Render application. */
const container = document.getElementById('root'); // Obtén el contenedor del DOM

if (!container) {
    throw new Error("No se encontró el contenedor con ID 'root' en el DOM.");
}
/* Configure i18n. */
const {locale, messages} = initReactIntl();

// Usa createRoot para renderizar la aplicación
const root = ReactDOM.createRoot(container);
root.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <IntlProvider locale={locale} messages={messages}>
                    <App />
                </IntlProvider>
            </PersistGate>
        </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
