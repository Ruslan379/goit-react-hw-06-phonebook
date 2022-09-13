
import { useDispatch, useSelector } from "react-redux"; //? +++

import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { nanoid } from 'nanoid';

import store from 'redux/store'; //?

import useLocalStorage from 'hooks/useLocalStorage';

import { Container } from 'components/Container/Container';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';





export const App = () => {

  //! useState ===> contacts (аналог this.state.contacts)
  //! Используем Хук useLocalStorage (hooks/useLocalStorage):
  const [contacts, setContacts] = useLocalStorage("contacts", []); 
  
  //! useState ===> filter (аналог this.state.filter)
  const [filter, setFilter] = useState('');




  //! Добавление контакта в this.state.contacts
  // const addСontact = (name, number) => {
  //   const contact = {
  //     id: nanoid(),
  //     name,
  //     number,
  //   };
  //   setContacts(prevState =>
  //     [...prevState, contact]);
  // };

  //! Принимаем пропсы (name, number) из ContactForm
  //! alert с предупреждением о наявности контакта
  // const formSubmitHandler = (name, number) => {
    
  //   if (contacts.find(item => item.name.toLowerCase() === name.toLowerCase())) {
  //     alert(`${name} is already in contacts.`);
  //     toast.warning(`${name} уже есть в контактах.`);
  //     return;
  //   } else {
  //     addСontact(name, number);
  //     }
  // };

  //? ++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const dispatch = useDispatch();
  // console.log(dispatch); //!
  //? ++++++++++++++++++++++++++++++++++++++++++++++++++++++
  console.log("App store.getState():", store.getState()); //!

  //! Хук useSelector читает данные из state Redux-хранилища и подписывается на их обновление
  const StateName = () => {
  return useSelector(state => state.contacts.items[0].name);
  };

  const StateNumber = () => {
  return useSelector(state => state.contacts.items[0].number);
  };

  console.log("StateName:", StateName()); //!
  console.log("StateNumber:", StateNumber()); //!
  //!_________________________________________________

  //? +++++++++++++++++++++++++++++++++++++++
  //?  Добавление контакта в addName и addNumber
  const addName = (name) => ({
      type: "ADD_NAME",
      payload: name,
    });
    console.log("addName:", addName); //!

    const addNumber = (number) => ({
      type: "ADD_NUMBER",
      payload: number,
    });
    console.log("addNumber:", addNumber); //!

  //! динамика
    // const myAction = (name, number) => ({
    //   type: "MY_ACTION",
    //   payload: { name, number },
    // });

  //? Принимаем пропсы (name, number) из ContactForm
  //? alert с предупреждением о наявности контакта
  const formSubmitHandler = (name, number) => {
    
    if (contacts.find(item => item.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
      toast.warning(`${name} уже есть в контактах.`); 
      return;
    } else {
      // addName(name);
      // addNumber(number);

      // store.dispatch(addName); //! НЕ РАБОТАЕТ!!!
      // store.dispatch(addNumber); ///! НЕ РАБОТАЕТ!!!
      
      console.log(name, number);
      dispatch(addName(name));
      dispatch(addNumber(number));
      }
  };



  //! запись значения из input-(Find contacts by name) в this.setState.filter
  const changeFilter = (event) => {
    setFilter(event.currentTarget.value); 
  };



  //! Создание нового массива объектов из this.state.contacts с учетом значения поиска из this.state.filter
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      (contact.name.toLowerCase()).includes(normalizedFilter),
    );
  };



  //! Создание нового массива объектов из this.state.contacts с учетом удаления контакта по его contact.id
  const deleteTodo = contactId => {
    setContacts(prevState => (prevState.filter(contact => contact.id !== contactId)));
  };



  const visibleContacts = getVisibleContacts();
  const totalContacts = contacts.length;



// * +++++++++++++++++++++++++++ MARKUP ++++++++++++++++++++++++++++++++++
    return (
      <Container>
        <ToastContainer autoClose={1000} />

        <h1>Phonebook (HW-6)</h1>

        <ContactForm onSubmit={formSubmitHandler} />

        <h2>Contacts</h2>
        <p>Total: {totalContacts}</p>

        <Filter
          value={filter}
          onChange={changeFilter}
        />
        
        <ContactList
          visibleContacts={visibleContacts}
          onDeleteTodo={deleteTodo}
        />

      </Container>
    );
  }
