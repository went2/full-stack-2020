import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0,0,0,0,0,0]);

  const handleAnecdotesChange = () => {
    const randomNum = Math.floor(Math.random()*6);
    setSelected(randomNum);
  };

  const handleVotesChange = (selected) => {
      const newArray = [...votes];
      newArray[selected] += 1;
      setVotes(newArray);
  };

  const mostVoted = (anecdotes) => {
    const indexOfMax = votes.indexOf(Math.max(...votes));
    return [indexOfMax,anecdotes[indexOfMax]];
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={() => handleVotesChange(selected)}>vote</button>
      <button onClick={handleAnecdotesChange}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <div>{mostVoted(props.anecdotes)[1]}</div>
      <div>has { votes[mostVoted(props.anecdotes)[0]] } votes</div>
    </>
  )
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);