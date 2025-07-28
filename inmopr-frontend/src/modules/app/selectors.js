/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

const getModuleState = state => state.app;

export const getError = state => getModuleState(state).error;

export const isLoading = state => getModuleState(state).loading;