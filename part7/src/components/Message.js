import React from 'react';
import { useSelector } from 'react-redux';

const Message = function() {
  const notification = useSelector(state => state.notification);

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

  if (!notification.content) {
    return null;
  }
  return (
    notification.error
      ? <div style={messageStyle2}>{notification.content} </div>
      : <div style={messageStyle1}>{notification.content} </div>
  );

};

export default Message;