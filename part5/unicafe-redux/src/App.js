import React from 'react';
import { 
  increaseGood, increaseOk, increaseBad, setZero
} from './reducer';

import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  
  const good = () => dispatch(increaseGood());
  const ok = () => dispatch(increaseOk());
  const bad = () => dispatch(increaseBad());
  const zero = () => dispatch(setZero());
  

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {state.good}</div>
      <div>neutral {state.ok}</div>
      <div>bad {state.bad}</div>
    </div>
  );
};

export default App;