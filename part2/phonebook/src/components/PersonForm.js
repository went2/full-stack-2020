import React from 'react';

const PersonForm = (props) => {

  return (
    <form>
        <div>
          name: 
          <input
          value={props.newName}
          onChange={ props.handleNameInput } />
        </div>
        <div>
          number: 
          <input 
          value={props.newNumber}
          onChange={ props.handleNumberInput }
          />
        </div>
        <div>
          sex: 
          <input 
          value={props.newSex}
          onChange={ props.handleSexInput }
          />
        </div>
        <div>
          <button 
          type="submit"
          onClick={ props.handleSubmit }
          >add</button>
        </div>
      </form>
  );

};

export default PersonForm;