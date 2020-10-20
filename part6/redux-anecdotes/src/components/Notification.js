import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationEraser } from '../reducers/notificationReducer';

let timeout;

const Notification = () => {
  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();

  if(notification) {
    let timeoutID1 = setTimeout(() => { dispatch(notificationEraser()) }, 3000);
    console.log(timeoutID1);
    if (timeoutID1 === timeout) {
      clearTimeout(timeoutID1);
      let timeoutID2 = setTimeout(() => { dispatch(notificationEraser()) }, 3000);
      timeout = timeoutID2;
    }
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  return notification 
    ? <div style={style}> {notification} </div> 
    : null

};

export default Notification;