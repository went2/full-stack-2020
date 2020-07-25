import React from 'react';

const Persons = ({ personsToShow, filterStr, handleDelete }) => 

    personsToShow
    .filter(
      item => 
      item.name.toLowerCase().indexOf(filterStr.toLowerCase()) > -1
    )
    .map(
      item => 
        <div 
        key={item.name}>
          {item.name}: {item.number} {item.sex} 
          <button 
            key={item.name}
            onClick={ event => handleDelete(event, item.id) }
            >delete</button>
        </div>
    );

export default Persons;