import React from 'react';
import { connect } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
import { voteActionCreator } from '../reducers/anecdoteReducer';
import { showVoteAnec } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  // const state = useSelector(state => state);
  // const dispatch = useDispatch();

  // const filteredAnec = state.anecdotes.filter(anec => anec.content.includes(state.filter))

  // const sortedAnec = filteredAnec.sort((a, b) => b.votes - a.votes);
  
  const handleVote = (anecdote) => {
    props.voteActionCreator(anecdote);
    props.showVoteAnec(anecdote.content);
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {
        props.sortedAnec.map(anecdote => 
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote) }>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
};

const mapStateToProps = state => {
  const filteredAnec = state.anecdotes.filter(anec => anec.content.includes(state.filter));
  const sortedAnec = filteredAnec.sort((a, b) => b.votes - a.votes);

  return {
    sortedAnec
  };
};

const mapDispatchToProps = dispatch => {
  return {
    voteActionCreator: anecdote => dispatch(voteActionCreator(anecdote)),
    showVoteAnec: content => dispatch(showVoteAnec(content))
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
export default ConnectedAnecdoteList;