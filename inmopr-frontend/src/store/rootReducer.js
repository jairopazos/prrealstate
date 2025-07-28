/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import {combineReducers} from 'redux';

import app from '../modules/app';
import users from '../modules/users';

const rootReducer = combineReducers({
    app: app.reducer,
    users: users.reducer,
});

export default rootReducer;
