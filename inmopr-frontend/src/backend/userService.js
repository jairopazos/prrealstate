/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import {config, appFetch, setServiceToken, getServiceToken, removeServiceToken, setReauthenticationCallback} from './appFetch';

export const login = (email, password, onSuccess, onErrors, reauthenticationCallback) =>
    appFetch('/users/login', config('POST', {email, password}),
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        },
        onErrors);

export const logout = () => removeServiceToken();

export const signUp = (user, onSuccess, onErrors, reauthenticationCallback) => {
    appFetch('/users/signUp', config('POST', user),
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        },
        onErrors);
}

export const updateProfile = (user, onSuccess, onErrors) =>
    appFetch(`/users/${user.id}`, config('PUT', user),
        onSuccess, onErrors);