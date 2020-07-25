import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Message from './components/Message';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newSex, setNewSex ] = useState('');
  const [ show, setShow ] = useState('all');
  const [ filter, setFilter ] = useState('');
  const [ message, setMessage] = useState('');
  const [ error, setError] = useState(0);
  
  const handleSubmit = event => {
    event.preventDefault();

    const samePerson = compareName(newName);
    if (samePerson) {
     const cfm = window.confirm(`${newName} is already added to phonebook, replace the old info?`);
     if (cfm) {
      const updatedPeson = {
        ...samePerson,
        number: newNumber,
        sex: newSex
      }
      personService
        .update(samePerson.id, updatedPeson)
        .then(returnedData => {
          console.log('更新成功，返回数据',returnedData);
          setPersons(persons.map(person => person.id !== samePerson.id ? person : returnedData));
          setMessage(`updated ${samePerson.name}`);
          setTimeout(() => {
            setMessage('')
          }, 3000)
          setNewName('');
          setNewNumber('');
          setNewSex('');
        })
        .catch(() => {
          // console.log(`error happens${err}`);
          setMessage(`information of ${samePerson.name} has already been removed from server, please reflesh your page`);
          setError(1);
          setTimeout(() => {
            setMessage('')
          }, 3000)
          setNewName('');
          setNewNumber('');
          setNewSex('');
        });
     }

    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        sex: newSex
      }
      personService
        .create(newPerson)
        .then(returnedData => {
          console.log('新增成功，返回数据',returnedData);
          setPersons(persons.concat(returnedData));
          setMessage(`added ${newName}`);
          setTimeout(() => {
            setMessage('')
          }, 3000)

          setNewName('');
          setNewNumber('');
          setNewSex('');
        }) 
    }
  };

  const compareName = (newName) => {
    let filtedperson = persons.find( person => person.name === newName );
    return filtedperson;
  };

  const showWho = () => {
    if (show === 'all') {
      return persons;
    } else if (show === 'male') {
      return persons.filter(person => person.sex === 'male')
    } else {
      return persons.filter(person => person.sex === 'female')
    }
  }
  let personsToShow = showWho();

  const handleDelete = (event, id) => {
    event.preventDefault();
    const deletedName = persons.find(persons => persons.id === id).name;
    const cfm = window.confirm(`Delete ${deletedName}?`);
    if (cfm) {
      const newPersons = persons.filter(person => person.id !== id);
      setPersons(newPersons);
      personService.deleteItem(id)
    }
  };

  const handleShow = (event) => {
    event.preventDefault();
    const showButton = event.target.dataset.value;
    if (showButton === 'all') {
      setShow('all');
    } else if (showButton === 'male') {
      setShow('male');
    } else {
      setShow('female');
    }
  }

  const handleFilter = (event) => {
    const query = event.target.value;
    setFilter(query);
  };

  const handleNameInput = (event) => setNewName(event.target.value);
  const handleNumberInput = (event)=> setNewNumber(event.target.value);
  const handleSexInput = (event) => setNewSex(event.target.value);

  // use axios to fetch initial state of the application 
  const hook = () => {
    personService
      .getAll()
      .then( initialData => {
        setPersons(initialData);
      })
  }
  useEffect(hook, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Message
        message={message}
        error={error}
      />
      <Filter 
        handleFilter={ handleFilter }
        handleShow={ handleShow }
      />
      
      <h2>Add a new</h2>
      <PersonForm 
        newName = { newName }
        newNumber = { newNumber }
        newSex = { newSex }
        handleNameInput = { handleNameInput }
        handleNumberInput = { handleNumberInput }
        handleSexInput = { handleSexInput }
        handleSubmit = { handleSubmit }
      />

      <h2>Numbers</h2>
      <Persons 
        personsToShow = { personsToShow } 
        filterStr = { filter }
        handleDelete = { handleDelete }
      />
    </div>
  )
}

export default App;