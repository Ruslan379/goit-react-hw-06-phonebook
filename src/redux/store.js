import { createStore, } from 'redux';
// import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// import actions from 'redux/actions';
// import { myAction } from 'redux/actions'; //?

import { nanoid } from 'nanoid';

//! ++++++++++++++++++++++++++++++++
// const initialState = {};

const myInitialState = {
    contacts: {
        items: [{
            id: nanoid(),
            name: "",
            number: ""
        }],
        filter: "",
    },
};

console.log("myInitialState:", myInitialState);


const reducer = (state = myInitialState, myAction) => {
    console.log("Лог action в reducer:", myAction.type, myAction.payload);
    switch (myAction.type) {
        case myAction.type:
            console.log("Лог-IN action в reducer:", myAction.type, myAction.payload);
            state.contacts.items[0].name = myAction.payload;
            return state;
        //! ???? ТАК НЕ РАБОТАЕТ
        // return { ...state, contacts: { ...state.contacts, items: [...state.contacts.items, [...state.contacts.items[0], (items[0].name = myAction.payload)],] } }

        // return {
        //     ...state,
        //     contacts: {...state.contacts, state.contacts.items[0].name = payload}
        // };


        default:
            console.log("Лог-default action в reducer:", myAction.type, myAction.payload);
            return state;
    }
};

//? +++++++++++++++++++++


const store = createStore(reducer, composeWithDevTools());
console.log("myInitialState:", myInitialState);

export default store;