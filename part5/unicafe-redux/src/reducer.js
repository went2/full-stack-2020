const initialState = {
  good: 0,
  ok: 0,
  bad: 0
};

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return {...state, good: state.good + 1}
    case 'OK':
      return {...state, ok: state.ok + 1}
    case 'BAD':
      return {...state, bad: state.bad + 1}
    case 'ZERO':
      return initialState;
    default: return state
  }
}

export const increaseGood = () => { return { type: 'GOOD'} };
export const increaseOk = () => { return { type: 'OK'} };
export const increaseBad = () => { return { type: 'BAD'} };
export const setZero = () => { return { type: 'ZERO'} };



export default counterReducer;