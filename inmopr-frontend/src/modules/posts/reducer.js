import * as actionTypes from './actionTypes';

const initialState = {
    listings: [],
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_LISTINGS:
            return {
                ...state,
                listings: action.payload.listings || action.payload, // Depende de cómo viene tu respuesta
                loading: false,
                error: null
            };
        case actionTypes.FETCH_LISTINGS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default reducer;