import { useEffect, useReducer } from 'react';
import { useGlobalContext } from './context';
import moment from 'moment'
import reducer from './reducer';

export const useFetchBalance = (token) => {
    const {setTransactions, includedCategories, startDate, dailyLimit, setDailyAverage} = useGlobalContext();

  const initialBalanceState = {
    isError: false,
    isLoading: true,
    balance: 0,
    prevDayBalance: 0
  }

  const [state, dispatch] = useReducer(reducer, initialBalanceState);

  const URLforBudgetID = `https://api.youneedabudget.com/v1/budgets`;

  useEffect(() => {
    getBudgetId();
  }, [includedCategories, startDate, dailyLimit]);

    async function getBudgetId(){
    const response = await fetch(URLforBudgetID, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    if (data.error) dispatch({type: 'ERROR_DETECTED', payload: data.error})

    let budgetId = data.data.budgets[0].id;

    let transSum = 0;
    let prevDayTransSum = 0;

    const URLforTransactions = `https://api.youneedabudget.com/v1/budgets/${budgetId}/transactions?since_date=${startDate}`

    const response2 = await fetch(URLforTransactions, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
    });

    let transData = await response2.json();
    transData = transData.data.transactions;

    transData.forEach((trans) => {
      const {category_name, amount, date} = trans;

      if (includedCategories.includes(category_name)) {
        transSum += amount;

        let currentDateInMs = new Date(date).getTime();
        let finalDateInMs = new Date(transData[transData.length - 1].date).getTime();

        if (currentDateInMs < finalDateInMs) {
          prevDayTransSum += amount;
        }
      }
    })

    setTransactions(transData);

    let currentDate = new Date(moment().format('L'));

    // get time difference in # of days
    let diffInTime = currentDate.getTime() - new Date(startDate).getTime();

    let diffInDays = (diffInTime / (1000 * 3600 * 24)) + 1;
    diffInDays = +diffInDays.toFixed(0);

    dispatch({
      type: 'UPDATE_BALANCE', 
      payload: {
        balance: ((diffInDays * dailyLimit) + (transSum / 1000)).toFixed(2), prevDayBalance: ((diffInDays - 1) * dailyLimit) + (prevDayTransSum / 1000)}
      })

    setDailyAverage((transSum / 1000) / diffInDays);
}

return {isError: state.isError, isLoading: state.isLoading, balance:state.balance, prevDayBalance:state.prevDayBalance}
}