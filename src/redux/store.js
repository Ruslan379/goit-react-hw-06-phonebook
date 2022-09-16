import { configureStore } from '@reduxjs/toolkit'
// import { createAction, createReducer } from '@reduxjs/toolkit' //! Пока не используем

// import { createReducer } from '@reduxjs/toolkit' //? УЖЕ не используем
import { combineReducers } from 'redux';

import { createSlice } from '@reduxjs/toolkit'


//! +++ Можно импортировать action ТАК (1 вариант)
// import * as action from 'redux/actions'; //? УЖЕ не используем


// import { nanoid } from 'nanoid'; //? УЖЕ не используем

//! +++++++++++++++++++++++ ИНИЦИАЛИЗАЦИЯ State ++++++++++++
//! Модель (проэктирование) State
const initialItems = [];
const initialFilter = "";

// const allState = {
//     contacts: {
//         items: initialItems,
//         filter: initialFilter
//     }
// };

// console.log("Модель STATE ==>", allState); //!



//? +++++++++++++++++++++ itemsReducer +++++++++++++++++++++
// const itemsReducer = createReducer(initialItems, {
//     [action.AddLocalStorageContacts]: (state, { payload }) => {
//         const localStorageContacts = JSON.parse(localStorage.getItem(payload.key)) ?? payload.defaultValue;
//         // return { ...state, items: localStorageContacts }; //? OLD
//         return localStorageContacts;
//     },

//     [action.addContact]: (state, { payload }) => {
//         // console.log("action.addContact:", action); //!
//         const contact = {
//             // id: nanoid(), //? OLD
//             id: payload.id,
//             name: payload.name,
//             number: payload.number,
//         };
//         // const localStorageAddContacts = [...state.items, contact] //? OLD
//         const localStorageAddContacts = [...state, contact]
//         localStorage.setItem("contacts", JSON.stringify(localStorageAddContacts))
//         // return { ...state, items: [...state.items, contact] }; //? OLD
//         return localStorageAddContacts;
//     },
//     //? Перенесен в filterReducer
//     // [action.changesFilter]: (state, action) => {
//     //     return { ...state, filter: action.payload };
//     // },

//     [action.deletesTodo]: (state, { payload }) => {
//         // const newContact = state.items.filter(contact => contact.id !== action.payload) //? OLD
//         const id = payload.contactId;
//         // console.log("id:", id); //!
//         // console.log("action.deletesTodo state:", state); //! не показывает
//         const newContact = state.filter(contact => contact.id !== id)
//         localStorage.setItem("contacts", JSON.stringify(newContact))
//         // return { ...state, items: newContact }; //? OLD
//         return newContact;
//     },
// });
//* +++++++++++++++++++++ itemsSlice +++++++++++++++++++++
const itemsSlice = createSlice({
    name: 'items',
    initialState: initialItems,
    reducers: {
        addLocalStorageContacts(state, { payload }) {
            const localStorageContacts = JSON.parse(localStorage.getItem(payload.key)) ?? payload.defaultValue;
            return localStorageContacts;
        },

        addContact(state, { payload }) {
            const contact = {
                id: payload.id,
                name: payload.name,
                number: payload.number,
            };
            const localStorageAddContacts = [...state, contact]
            localStorage.setItem("contacts", JSON.stringify(localStorageAddContacts))
            return localStorageAddContacts;
        },

        deletesTodo(state, { payload }) {
            const id = payload.contactId;
            const newContact = state.filter(contact => contact.id !== id)
            localStorage.setItem("contacts", JSON.stringify(newContact))
            return newContact;
        },
    }
});

export const { addLocalStorageContacts, addContact, deletesTodo } = itemsSlice.actions



//? +++++++++++++++++++++ filterReducer  +++++++++++++++++++++
// const filterReducer = createReducer(initialFilter, {
//     [action.changesFilter]: (state, { payload }) => {
//         // console.log("action.changesFilter state:", state); //! показывает с задержкой на 1 шаг
//         return payload.filterValue;
//     },
// })
//* +++++++++++++++++++++ filterSlice +++++++++++++++++++++
const filterSlice = createSlice({
    name: 'filter',
    initialState: initialFilter,
    reducers: {
        changesFilter(state, { payload }) {
            return payload.filterValue;
        },
    },
});

export const { changesFilter } = filterSlice.actions

//! +++++++++++++++++++++ rootReducer  +++++++++++++++++++++
//? OLD ---
// const rootReducer = combineReducers({
//     // contactsReducer, //! OLD
//     contacts: contactsReducer,
// });


//! w/o createSlice
// const rootReducer = combineReducers({
//     items: itemsReducer,
//     filter: filterReducer
// });

//! With createSlice
const rootReducer = combineReducers({
    items: itemsSlice.reducer,
    filter: filterSlice.reducer
});




//todo: OLD store +++++++++++++++++++++++++++++++++++++++++
// const store = createStore(rootReducer, composeWithDevTools()); //? ---

//! NEW store +++++++++++++++++++++++++++++++++++++++++
//?
// const store = configureStore({
//     reducer: {
//         contacts: contactsReducer
//     },
// });



export const store = configureStore({
    reducer: {
        contacts: rootReducer
    },
});



//! ++++++++++++++++++++++++++++ ВЕСЬ State +++++++++++++++++++++++++++++++++++
// console.log("ВЕСЬ State из App store.js ==> store.getState():", store.getState()); //!
//! ____________________________________________________________________________

// export default store; 