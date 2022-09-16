import { createSlice } from '@reduxjs/toolkit'



const initialItems = [];
//* +++++++++++++++++++++ itemsSlice +++++++++++++++++++++


export const itemsSlice = createSlice({
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