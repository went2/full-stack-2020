import React  from 'react';

const Search = (props) => { 

  return (
    <div>
      <form>
        find countries
        <input 
          value={ props.inputValue }
          onChange={ props.handleSearchInput }/>
      </form>
      
    </div>
  )
};

export default Search;