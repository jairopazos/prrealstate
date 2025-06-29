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
