// import { useEffect } from 'react'; //? уже не надо с redux-persist
import { useDispatch, useSelector } from "react-redux"; //! +++

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { nanoid } from 'nanoid'; 


import {
  // addLocalStorageContacts, //? уже не надо с redux-persist
  addContact,
  deleteContact
} from 'redux/itemsSlice'; 

import { changesFilter } from 'redux/filterSlice'; 

import { Container } from 'components/Container/Container';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';





export const App = () => {

  //! +++++++ Хук useDispatch +++++++++++++
  const dispatch = useDispatch();



  //! ++++++++++++++++++ Хук useSelector  ++++++++++++++++++
  //! читает данные из state Redux-хранилища и подписывается на их обновление
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);



  //? Добавление contacts из LocalStorage ==> уже не надо с redux-persist
  // useEffect(() => {
  //   dispatch(addLocalStorageContacts({ key: "contacts", defaultValue: []}));
  // }, [dispatch]);

  //? уже не надо с redux-persist
  //! Добавление contacts из LocalStorage with redux-persist
  // useEffect(() => {
  //   dispatch(addLocalStorageContacts({ key: "persist:items", defaultValue: []}));
  // }, [dispatch]);

  // const localStoragePersistItems = JSON.parse(localStorage.getItem("persist:items")) ?? [];
  // console.log(JSON.parse(localStoragePersistItems.items)); //!




  //! Принимаем (name, number) из ContactForm
  //! alert с предупреждением о наявности контакта
  //!  Добавление контакта в Действия (actions) ==> 
  const formSubmitHandler = (name, number) => {
    if (
      contacts.find(item => item.name.toLowerCase() === name.toLowerCase())
    ) {
      toast.warning(`${name} уже есть в контактах.`); 
      return;
    }
    // dispatch(addContact({ id: nanoid(), name, number }));
    dispatch(addContact({name, number}));
  };



//! запись значения из input-(Find contacts by name) в filter
  const changeFilter = (event) => {
    const filterValue = event.currentTarget.value; 
    dispatch(changesFilter({filterValue}));
  };



  //! Создание нового массива объектов из contacts с учетом значения поиска из filter
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      (contact.name.toLowerCase()).includes(normalizedFilter),
    );
  };



  //! Создание нового массива объектов из this.state.contacts с учетом удаления контакта по его contact.id
  const onDeleteContact = contactId => {
    dispatch(deleteContact({contactId}));
  };



  const visibleContacts = getVisibleContacts();
  const totalContacts = contacts.length;



// * +++++++++++++++++++++++++++ MARKUP ++++++++++++++++++++++++++++++++++
    return (
      <Container>

        <h1>Phonebook HW-6<span style={{ fontSize: "20px" }}> (with Redux-Persist)</span></h1>

        <ContactForm onSubmit={formSubmitHandler} />

        <h2>Contacts</h2>
        <p>Total: {totalContacts}</p>

        {contacts.length > 0 && (
          <>
            <Filter
              value={filter}
              onChange={changeFilter}
            />
            
            <ContactList
              visibleContacts={visibleContacts}
              onDeleteContact ={onDeleteContact}
            />
          </>
        )}
        
        <ToastContainer autoClose={1000} />

      </Container>
    );
  }
