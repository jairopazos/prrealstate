import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {ErrorDialog, Loader} from '../../common';
import * as selectors from '../selectors';
import * as actions from "../actions";

const ConnectedErrorDialog = () => {

    const error = useSelector(selectors.getError);
    const dispatch = useDispatch();

    return <ErrorDialog error={error}
                onClose={() => dispatch(actions.error(null))}/>

};

const ConnectedLoader = () => {

    const loading = useSelector(selectors.isLoading);

    return <Loader loading={loading}/>

};

const AppGlobalComponents = () => (

    <div>
        <ConnectedErrorDialog/>
        <ConnectedLoader/>
    </div>

);

export default AppGlobalComponents;