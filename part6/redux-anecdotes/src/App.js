import React, { useEffect } from 'react';
import ConnectedAnecdoteForm from './components/AnecdoteForm';
import ConnectedAnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import ConnectedFilter from './components/Filter';
import { useDispatch } from 'react-redux';
import { initAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {dispatch(initAnecdotes())}, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <ConnectedFilter />
      <Notification />
      <ConnectedAnecdoteForm />
      <ConnectedAnecdoteList />
    </div>
  )
};

export default App;