import {config, appFetch} from "./appFetch";

export const publishPost = (postDto, onSuccess, onErrors) =>
    appFetch('/listings/new', config('POST', postDto), onSuccess, onErrors);

export const fetchListings = (city, page = 0, size = 10, onSuccess, onErrors) => {
    const params = new URLSearchParams({city, page: page.toString(), size: size.toString()});

    appFetch(`/listings?${params.toString()}`, config('GET'), onSuccess, onErrors);
}