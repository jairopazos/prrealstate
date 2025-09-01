/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import * as actionTypes from './actionTypes';
import backend from '../../backend';
import {removeServiceToken} from "../../backend/appFetch";

const loginCompleted = authenticatedUser => ({
    type: actionTypes.LOGIN_COMPLETED,
    authenticatedUser
});

const signUpCompleted = authenticatedUser => ({
    type: actionTypes.SIGN_UP_COMPLETED,
    authenticatedUser
});

const fetchUserReviewsCompleted = (advertiserId, reviews) => ({
    type: "REVIEWS/SET",
    payload: { advertiserId, reviews },
});

const createUserReviewCompleted = (advertiserId, review) => ({
    type: "REVIEWS/ADD",
    payload: { advertiserId, review },
});

export const login = (email, password, onSuccess, onErrors, reauthenticationCallback) => dispatch =>
    backend.userService.login(email, password,
        authenticatedUser => {
            dispatch(loginCompleted(authenticatedUser));
            onSuccess();
        },
        onErrors,
        reauthenticationCallback
    );

export const logout = () => dispatch => {
    // 1. Elimina el token del almacenamiento
    removeServiceToken();

    // 2. Dispara una acción para limpiar el estado de Redux
    dispatch({ type: actionTypes.LOGOUT_COMPLETED });
};

export const signUp = (user, onSuccess, onErrors, reauthenticationCallback) => dispatch =>
    backend.userService.signUp(user,
        authenticatedUser => {
            dispatch(signUpCompleted(authenticatedUser));
            onSuccess();
        },
        onErrors,
        reauthenticationCallback
    );

export const updateProfileCompleted = user => ({
    type: actionTypes.UPDATE_PROFILE_COMPLETED,
    user
})

export const updateProfile = (user, onSuccess, onErrors) => dispatch =>
    backend.userService.updateProfile(user,
        updatedUser => {   // ✅ viene del backend con favoritos actualizados
            dispatch(updateProfileCompleted(updatedUser));
            if (onSuccess) onSuccess(updatedUser);  // ✅ lo propagas también al callback
        },
        onErrors
    );

export const fetchUserReviews = (advertiserId, onSuccess, onErrors) => (dispatch) =>
    backend.userService.getUserReviews(
        advertiserId,
        (data) => {
            dispatch(fetchUserReviewsCompleted(advertiserId, data));
            if (onSuccess) onSuccess(data);
        },
        onErrors
    );

// POST /users/:id/reviews
export const createUserReview = (advertiserId, { rating, comment }, onSuccess, onErrors) => (dispatch) =>
    backend.userService.createUserReview(
        advertiserId,
        { rating, comment },
        (saved) => {
            dispatch(createUserReviewCompleted(advertiserId, saved));
            if (onSuccess) onSuccess(saved);
        },
        onErrors
    );