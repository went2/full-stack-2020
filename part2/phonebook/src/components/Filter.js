import React from 'react';

const Filter = ({handleFilter, handleShow}) => {

  return (
    <form>
      filter shown with <input onChange= { handleFilter } />
      <div>
        <button onClick={ handleShow } data-value='all'>all</button>
        <button onClick={ handleShow } data-value='male'>male</button>
        <button onClick={ handleShow } data-value='female'>female</button>
      </div>
    </form>
  );

};


export default Filter;