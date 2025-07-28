/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import {config, appFetch} from "./appFetch";

export const publishPost = (postDto, onSuccess, onErrors) =>
    appFetch('/listings/new', config('POST', postDto), onSuccess, onErrors);

export const fetchListings = (city, filters, page = 0, size = 10, onSuccess, onErrors) => {
    const params = new URLSearchParams();

    params.append("city", city);
    params.append("page", page.toString());
    params.append("size", size.toString());

    if (filters.tipoAnuncio) params.append("tipoAnuncio", filters.tipoAnuncio);
    if (filters.tipoVivienda) params.append("tipoVivienda", filters.tipoVivienda);
    if (filters.precioMax) params.append("precioMaximo", filters.precioMax);
    if (filters.habitaciones) params.append("numHabitaciones", filters.habitaciones);
    if (filters.banos) params.append("numBanos", filters.banos);
    if (filters.metrosConstruidos) params.append("metrosConstruidos", filters.metrosConstruidos);
    if (filters.metrosUtiles) params.append("metrosUtiles", filters.metrosUtiles);
    if (filters.estado) params.append("estado", filters.estado);

    appFetch(`/listings?${params.toString()}`, config('GET'), onSuccess, onErrors);
};

export const sendEmail = (emailDto, onSuccess, onErrors) => {
    appFetch('/listings/send-email', config('POST', emailDto), (response) => {
        // Si la respuesta es de tipo texto (no JSON), lo manejamos como texto.
        if (typeof response === 'string') {
            onSuccess(response); // Llamamos a onSuccess con la respuesta como texto
        } else {
            // Si es JSON, lo manejamos normalmente
            onSuccess(response);
        }
    }, (error) => {
        // Si ocurre un error, ejecutamos onErrors
        onErrors(error);
    });
};
