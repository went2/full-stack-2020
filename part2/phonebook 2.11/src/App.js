import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newSex, setNewSex ] = useState('');
  const [ show, setShow ] = useState('all');
  const [ filter, setFilter ] = useState('');
  
  const handleSubmit = event => {
    event.preventDefault();

    if (compareName(newName)) {
      alert (`${newName} is already added to phonebook.`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        sex: newSex
      }
      setPersons(persons.concat(newPerson));
    }
    setNewName('');
    setNewNumber('');
    setNewSex('');
  };
 
  const compareName = (newName) => {
    let name = persons.find( item => {
      return item.name === newName;
    } );
    return name;
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
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then((res) => {
        console.log('promise fullfilled', res.data);
        setPersons(res.data);
      })
  }
  useEffect(hook, []);

  return (
    <div>
      <h2>Phonebook</h2>
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
      />
    </div>
  )
}

export default App;