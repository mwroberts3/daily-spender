import { useEffect, useState } from 'react'
import moment from 'moment'
import './balance.css'

const Balance = ({setTransactions, includedCategories, startDate, dailyLimit}) => {
  const access_token = "GxpXh6Y5Se3hAe-q_GYr3-CC0TZSKaOZhZ9jJ1TV6Bs";

  const [isError, setIsError] = useState(false);
  const [balance, setBalance] = useState(0);
  const [prevDayBalance, setPrevDayBalance] = useState(0);

  const getBudgetId = async () => {
    const response = await fetch(`https://api.youneedabudget.com/v1/budgets`, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${access_token}`
      }
    });

    const data = await response.json();
    
    return data.data.budgets[0].id;
  }

  const getTransactions = async (budgetId) => {
    let transSum = 0;
    let prevDayTransSum = 0;

    const response = await fetch(`https://api.youneedabudget.com/v1/budgets/${budgetId}/transactions?since_date=${startDate}`, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${access_token}`,
      },
    });

    let transData = await response.json();
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

    return {transSum, prevDayTransSum};
  }

  const calculateBalance = ({transSum, prevDayTransSum}) => {
    let currentDate = new Date(moment().format('L'));

    // get time difference in # of days
    let diffInTime = currentDate.getTime() - new Date(startDate).getTime();

    let diffInDays = (diffInTime / (1000 * 3600 * 24)) + 1;
    diffInDays = +diffInDays.toFixed(0);

    console.log('difference in days', diffInDays);

    setBalance(((diffInDays * dailyLimit) + (transSum / 1000)).toFixed(2));
    setPrevDayBalance(((diffInDays - 1) * dailyLimit) + (prevDayTransSum / 1000));
  }

  useEffect(() => {
    getBudgetId()
      .then((budgetId) => getTransactions(budgetId))
      .then((transSum) => calculateBalance(transSum))
  }, [includedCategories, dailyLimit, startDate])

  return (
    <div className='b'>
      <p className={
        balance < 0 ? 'b-neg-2' : balance < prevDayBalance ? 'b-neg-1' : 'b-pos'}> 
        {balance !== 0 ? `$${balance}` : 'loading...'}
      </p>
    </div>
  )
}

export default Balance