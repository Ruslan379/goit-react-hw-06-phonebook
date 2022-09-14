// import { createStore, } from 'redux';
import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


// import actions from 'redux/actions';
// import { A } from 'redux/actions'; //?

import { nanoid } from 'nanoid';

//! +++++++++++++++++++++++ ИНИЦИАЛИЗАЦИЯ ЧАСТЕЙ State ++++++++++++
// const initialState = {};

// const allState_OLD = {
//     contacts: {
//         items: [{
//             id: nanoid(),
//             name: "",
//             number: ""
//         }],
//         filter: "",
//     },
// };

// const contactsState1 = {
//     items: [{
//         id: nanoid(),
//         name: "",
//         number: ""
//     }],
// };


// const contactsState = {
//     items: [],
// };

// const filterState = {
//     filter: "",
// };


const allState = {
    items: [],
    filter: "",
};

// console.log("allState_OLD:", allState_OLD); //!
// console.log("contactsState:", contactsState); //!
// console.log("filterState:", filterState); //!
console.log("STATE ==> contacts:", allState); //!


//! ++++++++++++++++++++++++++++ Reducers  +++++++++++++++++++++++
//! +++++++++++++++++++++ contactsReducer  +++++++++++++++++++++
const contactsReducer = (state = allState, { type, payload }) => {
    console.log("Лог action в reducer:", type, payload); //!
    switch (type) {
        case "ADD_Name&Number":
            console.log("Лог-IN action в reducer:", type, payload); //!
            // state.contacts.items[0].name = payload;

            // state.contacts.items[0].name = payload.name;
            // state.contacts.items[0].number = payload.number;

            // state.items[0].id = nanoid();
            // state.items[0].name = payload.name;
            // state.items[0].number = payload.number;
            // return state;

            const contact = {
                id: nanoid(),
                name: payload.name,
                number: payload.number,
            };

            return { ...state, items: [...state.items, contact] };



        // ???? ТАК НЕ РАБОТАЕТ
        // return { ...state, contacts: { ...state.contacts, items: [...state.contacts.items, [...state.contacts.items[0], (items[0].name = A.payload)],] } }
        // ???? ТАК НЕ РАБОТАЕТ
        // return {
        //     ...state,
        //     contacts: {...state.contacts, state.contacts.items[0].name = payload}
        // };

        // case "ADD_NUMBER":
        //     console.log("Лог-IN action в reducer:", type, payload);
        //     // state.contacts.items[0].number = payload.number;
        //     state.contacts.items[0].number = payload;
        //     return state;

        default:
            console.log("Лог-default action в reducer:", type, payload);
            return state;
    }
};

//! +++++++++++++++++++++ contactsReducer  +++++++++++++++++++++
// const filterReducer = (state = filterState, { type, payload }) => {
//     console.log("Лог action в reducer:", type, payload); //!
//     switch (type) {
//         case "ADD_FILTER":
//             console.log("Лог-IN action в reducer:", type, payload); //!

//             return state;

//         default:
//             console.log("Лог-default action в reducer:", type, payload);
//             return state;
//     }
// };
//! _______________________ Reducers ____________________________________

//! +++++++++++++++++++++ rootReducer  +++++++++++++++++++++
// const rootReducer = combineReducers({
//     contactsReducer,
//     filterReducer,
// });

const rootReducer = combineReducers({
    contactsReducer,
});
//! _______________________ rootReducer ____________________________________

const store = createStore(rootReducer, composeWithDevTools());

//? ++++++++++++++++++++ ВЕСЬ State +++++++++++++++++++++++++++
console.log("STORE ==> store.getState() ==> ВЕСЬ State:", store.getState()); //!


export default store;