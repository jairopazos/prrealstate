const getModuleState = state => state.users;

export const getUser = state => 
    getModuleState(state).user;

export const role = state =>
    isLoggedIn(state) ? getUser(state).role : null;

export const isLoggedIn = state =>
    getUser(state) !== null

export const getFirstName = state =>
    isLoggedIn(state) ? getUser(state).firstName : null;



