import { createStore } from 'redux';

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


const reducer = (state = myInitialState, action) => {
    console.log("Лог action в reducer:", action);
    return state
};

//? +++++++++++++++++++++


const store = createStore(reducer);

export default store;