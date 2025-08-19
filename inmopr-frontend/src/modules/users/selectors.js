/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

const getModuleState = state => state.users;

export const getUser = state => 
    getModuleState(state).user;

export const role = state =>
    isLoggedIn(state) ? getUser(state).role : null;

export const isLoggedIn = state =>
    getUser(state) !== null

export const getFirstName = state =>
    isLoggedIn(state) ? getUser(state).firstName : null;

export const getEmail = state =>
    isLoggedIn(state) ? getUser(state).email : null;

export const getUserId = state =>
    isLoggedIn(state) ? getUser(state).id : null;


