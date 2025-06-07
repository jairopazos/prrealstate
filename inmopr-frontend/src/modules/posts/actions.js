import backend from "../../backend";
import * as actionTypes from './actionTypes';

const fetchingListings = () => ({
   type: actionTypes.FETCH_LISTINGS
});

export const publishPost = (postDto, onSuccess, onErrors) => dispatch =>
    backend.postService.publishPost(postDto, onSuccess, onErrors);

export const fetchListings = (city, page = 0, size = 10, onSuccess, onError) => dispatch => {
    backend.postService.fetchListings(city, page, size,
        listingsData => {
        dispatch({type:actionTypes.FETCH_LISTINGS, payload: listingsData });
        if (onSuccess) onSuccess(listingsData);
        },
        error => {
            dispatch({ type: actionTypes.FETCH_LISTINGS_FAILURE, error });
            if (onError) onError(error);
        }
    );
}