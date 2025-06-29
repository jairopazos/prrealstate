import backend from "../../backend";
import * as actionTypes from './actionTypes';

const fetchingListings = () => ({
   type: actionTypes.FETCH_LISTINGS
});

export const publishPost = (postDto, onSuccess, onErrors) => dispatch =>
    backend.postService.publishPost(postDto, onSuccess, onErrors);

export const fetchListings = (city, filters, page = 0, size = 10, onSuccess, onError) => dispatch => {
    const flatParams = {
        city,
        page,
        size,
        ...filters
    };

    const queryString = new URLSearchParams(flatParams).toString();

    fetch(`/listings?${queryString}`)
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {
            dispatch({ type: actionTypes.FETCH_LISTINGS, payload: data });
            if (onSuccess) onSuccess(data);
        })
        .catch(error => {
            dispatch({ type: actionTypes.FETCH_LISTINGS_FAILURE, error });
            if (onError) onError(error);
        });
};
