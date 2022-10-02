const reducer = (state, action) => {
  if (action.type === 'UPDATE_BALANCE') {

    return {
      ...state,
      balance: action.payload.balance,
      prevDayBalance: action.payload.prevDayBalance
    };
  }

  return state;
}

export default reducer;