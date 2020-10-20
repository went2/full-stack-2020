import React from 'react';
import { connect } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showCreateAnec } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';

    // 下面这行是异步操作（和服务器通信，并获得返回），不要在组件内进行，把它移到reducer中
    // const res = await anecdoteService.createNew(content);
    props.createAnecdote(content);
    
    props.showCreateAnec(content);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )                                    
};

const mapDispatchToProps = dispatch => {
  return {
    createAnecdote: content => dispatch(createAnecdote(content)),
    showCreateAnec: content => dispatch(showCreateAnec(content))
  }
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm;