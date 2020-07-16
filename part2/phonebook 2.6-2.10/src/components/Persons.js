import React from 'react';

const Persons = ({personsToShow, filterStr}) => 

    personsToShow
    .filter(
      item => 
      item.name.toLowerCase().indexOf(filterStr.toLowerCase()) > -1
    )
    .map(
      item => 
      <div key={item.name}>{item.name}: {item.number} {item.sex}</div>
    );

export default Persons;