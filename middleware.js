const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger()
const redux = require('redux');
const combineReducer = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const createStore = redux.createStore

const initialIceState = {
    numOfice: 10
}

const intialCakeState = {
    numOfcake: 10
}

const BUY_CAKE = '¸';
const BUY_ICE  = 'BUY_ICE';

function buyCake() {
  return {
      type: BUY_CAKE
    }
}
function buyIceCream() {
    return {
        type: BUY_ICE
    }
}

const iceReducer = (state = initialIceState, action) => {
        switch(action.type) {
            case BUY_ICE: 
            return {
                ...state,
                numOfice: state.numOfice - 2
            }

            default: return state;
        }
}

const cakeReducer = (state = intialCakeState , action) => {
    switch(action.type)  {
            case BUY_CAKE: {
                return {
                ...state,
                numOfcake: state.numOfcake - 1
            }
        }

        default: return state;
    }
}
const finalReducer = combineReducer({
    cake: cakeReducer,
    ice: iceReducer
});
const store = createStore(finalReducer, applyMiddleware(logger));
console.log('store', store.getState());
const unsbscribe = store.subscribe(()=> {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());