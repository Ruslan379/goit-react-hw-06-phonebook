import { createStore, } from 'redux';
// import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// import actions from 'redux/actions';
// import { A } from 'redux/actions'; //?

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


//? +++++++++++++++++++++ rootReducer  +++++++++++++++++++++
// const rootReducer = combineReducers({
//     contacts: contactsReducer,
//     filter: filterReducer,
// });



//? +++++++++++++++++++++ reducer  +++++++++++++++++++++
const reducer = (state = myInitialState, { type, payload }) => {
    console.log("Лог action в reducer:", type, payload);
    switch (type) {
        case "ADD_NAME":
            console.log("Лог-IN action в reducer:", type, payload);
            // state.contacts.items[0].name = payload.name;
            state.contacts.items[0].name = payload;

            // state.contacts.items[0].number = payload.number;
            return state;
        //! ???? ТАК НЕ РАБОТАЕТ
        // return { ...state, contacts: { ...state.contacts, items: [...state.contacts.items, [...state.contacts.items[0], (items[0].name = A.payload)],] } }
        //! ???? ТАК НЕ РАБОТАЕТ
        // return {
        //     ...state,
        //     contacts: {...state.contacts, state.contacts.items[0].name = payload}
        // };
        case "ADD_NUMBER":
            console.log("Лог-IN action в reducer:", type, payload);
            // state.contacts.items[0].name = payload.number;
            state.contacts.items[0].number = payload;
            return state;

        default:
            console.log("Лог-default action в reducer:", type, payload);
            return state;
    }
};
//? +++++++++++++++++++++
















const store = createStore(reducer, composeWithDevTools());
console.log("myInitialState:", myInitialState);
// console.log("state:", state); //  'state' is not defined  no-undef

export default store;