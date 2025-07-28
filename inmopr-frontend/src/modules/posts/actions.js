import backend from "../../backend";
import * as actionTypes from './actionTypes';

const fetchingListings = () => ({
   type: actionTypes.FETCH_LISTINGS
});

export const publishPost = (postDto, onSuccess, onErrors) => dispatch =>
    backend.postService.publishPost(postDto, onSuccess, onErrors);

export const sendEmail = (emailDto, onSuccess, onErrors) => dispatch =>
    backend.postService.sendEmail(emailDto, onSuccess, onErrors);

