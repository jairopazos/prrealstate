/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa localStorage
import rootReducer from './rootReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['users'], // Aquí persistes solo el reducer 'users'
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        persistedReducer,
        composeEnhancers(applyMiddleware(thunk))
    );
    const persistor = persistStore(store);
    return { store, persistor };
};

export default configureStore;
