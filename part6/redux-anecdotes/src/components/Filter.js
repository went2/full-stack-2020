import React from 'react';
import { connect } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { filterAction } from '../reducers/filterReducer';

const Filter = (props) => {
  // const dispatch = useDispatch();

  const handleChange = (e) => {
    const input = e.target.value;
    props.filterAction(input);
  };

  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
};

const mapDispatchToProps = dispatch => {
  return {
    filterAction: input => dispatch(filterAction(input))
  }
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);

export default ConnectedFilter;