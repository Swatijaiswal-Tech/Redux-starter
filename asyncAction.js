const redux = require('redux');
const createRedux = redux.createStore
const thunkMiddleware = require('redux-thunk').default;
const applyMiddleware = redux.applyMiddleware
const axios = require('axios');
const initialState = {
    laoding: false,
    userse: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
} 

const fetchUserError = () => {
    return {
        type: FETCH_USERS_ERROR,
        payload: error
    }
}
const fetchUserSuccess = (users) => {
    return {
        type:FETCH_USERS_SUCCESS,
        payload: users
    }
}

const reducer = (state = initialState , action) => {
    console.log('inreducer', action.payload);
    switch(action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS: 
           return {
               laoding: false,
               users: action.payload,
               error: ''
           } 
        case FETCH_USERS_ERROR:
            return {
                loading: false,
                error: error,
                users: []
            }       
        }
    }

    const fetchUser = () => {
        return function(dispatch) {
            dispatch(fetchUserRequest());
            axios.get('https://jsonplaceholder.typicode.com/post')
            .then(response => {
                console.log('res',response);
                const data = response
                dispatch(fetchUserSuccess(data))
                // //response.data  id the array of users
            })
            .catch(error => {
                dispatch(fetchUserError(error.message));
            })
        }
    }
    const store = createRedux(reducer, applyMiddleware(thunkMiddleware));
    store.subscribe(()=> console.log(store.getState()));
    store.dispatch(fetchUser());
