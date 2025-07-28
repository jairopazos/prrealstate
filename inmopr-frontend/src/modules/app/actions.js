/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import * as actionTypes from './actionTypes';

export const loading = () => ({
    type: actionTypes.LOADING
});

export const loaded = () => ({
    type: actionTypes.LOADED
});

export const error = error => ({
    type: actionTypes.ERROR,
    error
});