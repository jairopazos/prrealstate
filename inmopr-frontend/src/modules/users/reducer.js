/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    user: null,
    token: null
};

const user = (state = initialState.user, action) => {

    switch (action.type) {

        case actionTypes.LOGIN_COMPLETED:
            return action.authenticatedUser.user;

        case actionTypes.LOGOUT_COMPLETED:
            return initialState;

        default:
            return state;

    }

}

const reducer = combineReducers({
    user
});

export default reducer;


