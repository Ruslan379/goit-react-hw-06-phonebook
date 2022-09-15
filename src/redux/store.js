import { configureStore } from '@reduxjs/toolkit'
// import { createAction, createReducer } from '@reduxjs/toolkit' //! Пока не используем

import { createReducer } from '@reduxjs/toolkit'
// import { combineReducers } from 'redux'; //! Пока не используем

// import { createStore, combineReducers } from 'redux'; //? УЖЕ не используем
// import { composeWithDevTools } from 'redux-devtools-extension'; //? УЖЕ не используем

//! +++ Можно импортировать action ТАК (1 вариант)
import * as action from 'redux/actions'; //! +++ 


import { nanoid } from 'nanoid';

//! +++++++++++++++++++++++ ИНИЦИАЛИЗАЦИЯ State ++++++++++++

const allState = {
    items: [],
    filter: "",
};

// console.log("STATE ==> contacts:", allState); //!



//todo +++++++++++++++++++++ contactsReducer OLD +++++++++++++++++++++
// const contactsReducer = (state = allState, { type, payload }) => {
//     // console.log("Лог action в reducer:", type, payload); //!
//     switch (type) {
//         case "ADD_localStorageContacts":
//             // console.log("Лог-IN action в reducer:", type, payload); //!
//             const localStorageContacts = JSON.parse(localStorage.getItem("contacts")) ?? [];
//             return { ...state, items: localStorageContacts };

//         case "ADD_Name&Number":
//             // console.log("Лог-IN action в reducer:", type, payload); //!
//             const contact = {
//                 id: nanoid(),
//                 name: payload.name,
//                 number: payload.number,
//             };
//             const localStorageAddContacts = [...state.items, contact]
//             localStorage.setItem("contacts", JSON.stringify(localStorageAddContacts))
//             return { ...state, items: [...state.items, contact] };

//         case "CHANGES_Filter":
//             // console.log("Лог-IN action в reducer:", type, payload); //!
//             return { ...state, filter: payload };

//         case "DELETES_Todo":
//             // console.log("Лог-IN action в reducer:", type, payload); //!
//             const newContact = state.items.filter(contact => contact.id !== payload)
//             localStorage.setItem("contacts", JSON.stringify(newContact))
//             return { ...state, items: newContact };

//         default:
//             // console.log("Лог-default action в reducer:", type, payload); //!
//             return state;
//     }
// };

//todo +++++++++++++++++++++ filterReducer  +++++++++++++++++++++
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
//todo _______________________ Reducers ____________________________________

//! +++++++++++++++++++ actions +++++++++++++++++++++++++++++
// const increment = createAction('increment')
// const decrement = createAction('decrement')


//! +++++++++++++++++++++ contactsReducer NEW +++++++++++++++++++++
const contactsReducer = createReducer(allState, {
    [action.AddLocalStorageContacts]: (state, action) => {
        const localStorageContacts = JSON.parse(localStorage.getItem(action.payload)) ?? [];
        return { ...state, items: localStorageContacts };
    },

    [action.addNameNumber]: (state, action) => {
        // console.log("action.addNameNumber:", action); //!
        const contact = {
            id: nanoid(),
            name: action.payload.name,
            number: action.payload.number,
        };
        const localStorageAddContacts = [...state.items, contact]
        localStorage.setItem("contacts", JSON.stringify(localStorageAddContacts))
        return { ...state, items: [...state.items, contact] };
    },

    [action.changesFilter]: (state, action) => {
        return { ...state, filter: action.payload };
    },

    [action.deletesTodo]: (state, action) => {
        const newContact = state.items.filter(contact => contact.id !== action.payload)
        localStorage.setItem("contacts", JSON.stringify(newContact))
        return { ...state, items: newContact };
    },
});



//! +++++++++++++++++++++ rootReducer  +++++++++++++++++++++
//? OLD ---
// const rootReducer = combineReducers({
//     // contactsReducer, //! OLD
//     contacts: contactsReducer,
// });


//! Пока не используем
// const rootReducer = combineReducers({
//     contacts: contactsReducer,
// });
//! ______________________ rootReducer ______________________



//todo: OLD store +++++++++++++++++++++++++++++++++++++++++
// const store = createStore(rootReducer, composeWithDevTools()); //? ---



//! NEW store +++++++++++++++++++++++++++++++++++++++++
const store = configureStore({
    reducer: {
        contacts: contactsReducer
    },
});



//! ++++++++++++++++++++++++++++ ВЕСЬ State +++++++++++++++++++++++++++++++++++
console.log("ВЕСЬ State из App store.js ==> store.getState():", store.getState()); //!
//! ____________________________________________________________________________

export default store;