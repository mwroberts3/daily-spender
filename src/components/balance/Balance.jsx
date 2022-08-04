import { useEffect, useState } from 'react'
import moment from 'moment'
import './balance.css'

const Balance = ({setTransactions, excludedCategories}) => {
  const access_token = "GxpXh6Y5Se3hAe-q_GYr3-CC0TZSKaOZhZ9jJ1TV6Bs";

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getBudgetId()
      .then((budgetId) => getTransactions(budgetId))
      .then((transSum) => calculateBalance(transSum))
  }, [])

  async function getBudgetId() {
    const response = await fetch(`https://api.youneedabudget.com/v1/budgets`, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${access_token}`
      }
    });

    const data = await response.json();
    
    return data.data.budgets[0].id;
  }

  async function getTransactions(budgetId) {
    let transSum = 0;

    const response = await fetch(`https://api.youneedabudget.com/v1/budgets/${budgetId}/transactions?since_date=2022-07-27`, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${access_token}`,
      },
    });

    const data = await response.json();

    console.log(data.data.transactions)

    data.data.transactions.forEach((trans) => {
      if (!excludedCategories.includes(trans.category_name) && !excludedCategories.includes(trans.payee_name)) {
        transSum += trans.amount;
      }
    })

    setTransactions(data.data.transactions);
    return transSum;
  }

  function calculateBalance(transSum) {
    // set startDate one day prior to actual start date, because otherwise day count is one less than should be
    let startDate = new Date('07/26/2022');
    let currentDate = new Date(moment().format('L'));

    // To calculate the time difference of two dates
    let Difference_In_Time = currentDate.getTime() - startDate.getTime();

    // To calculate the no. of days between two dates
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    setBalance(((Difference_In_Days * 27.40) + (transSum / 1000)).toFixed(2))
  }

  return (
    <div className='b'>
      <p className={balance < 0 ? 'b-neg-2' : balance < 27.40 - balance ? 'b-neg-1' : 'b-pos'}>{balance !== 0 ? `$${balance}` : 'loading...'}</p>
    </div>
  )
}

export default Balance