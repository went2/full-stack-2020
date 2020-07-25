import React from 'react';

const Message = function({ message,error }) {
  const messageStyle1 = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '15px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const messageStyle2 = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '15px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (!message) {
    return null;
  } 
  
  return (
    error === 0 ? 
    <div style={messageStyle1}>{message} </div> :
    <div style={messageStyle2}>{message} </div> 
  );

};

export default Message;