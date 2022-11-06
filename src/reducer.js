const reducer = (state, action) => {
  if (action.type === 'UPDATE_BALANCE') {

    return {
      ...state,
      isLoading: false,
      balance: action.payload.balance,
      prevDayBalance: action.payload.prevDayBalance,
      totalDays: action.payload.totalDays
    };
  }

  if (action.type === 'ERROR_DETECTED') {
    return {
      ...state, 
      isError: true
    }
  }

  return state;
}

export default reducer;