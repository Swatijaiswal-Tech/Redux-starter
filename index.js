const redux = require('redux');
const createStore = redux.createStore;

const intialState = {
    numOfcake: 10,
    numOficeCream: 10
}
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAME = 'BUY_ICECREAME';

function buyCake() {
    return {
        type: BUY_CAKE,
    }
}
function buyIcecream() {
    return  {
        type: BUY_ICECREAME
    }
    
}

//(previousState , action) => newState
const reducer = (state = intialState , action) => {
    switch(action.type) {
        case BUY_CAKE: 
        return {
            ...state,
            numOfcake: state.numOfcake - 1,
        }    
        case BUY_ICECREAME: 
        return {
         ...state,
         numOficeCream: state.numOficeCream - 1
            
        }   

    default: return state
    }  
}

const store = createStore(reducer);
console.log('initial state ', store.getState());
const unsbscribe = store.subscribe(() => console.log('updated state', store.getState()));
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
unsbscribe();
