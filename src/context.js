import React, { useState, useContext } from 'react'
import moment from 'moment'

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
  const [transactions, setTransactions] = useState([]);

  const [dailyLimit, setDailyLimit] = useState(() => {
    if (localStorage.getItem('dailyLimit')) {
      return JSON.parse(localStorage.getItem('dailyLimit'));
    }

    return 0;
  });

  const [startDate, setStartDate] = useState(() => {
    if (localStorage.getItem('startDate')) {

      let savedStartDate = new Date(JSON.parse(localStorage.getItem('startDate')));

      savedStartDate = moment(savedStartDate);

      return savedStartDate.add(1, 'day').format('YYYY-MM-DD');
    }

    return '';
  });

  const [includedCategories, setIncludedCategories] = useState(() => {
    if (localStorage.getItem('includedCategories')) {
      return JSON.parse(localStorage.getItem('includedCategories'));
    }

    return [];
  });


  const [isFirstTime, setIsFirstTime] = useState(() => {
    if (dailyLimit === 0 || startDate === '' || includedCategories === []) {
      return true;
    }

    return false;
  });

  const [dailyAverage, setDailyAverage] = useState(0);

  const calculateDailyAverage = (transByDate) => {
   //  calculate and bubble up daily average
   // getting an console error, even though working...
   let average = 0;  
   transByDate.forEach((tran) => {
    average += tran.total
   })
   setDailyAverage(+((average/transByDate.length) / 1000).toFixed(2));
  };

  return <AppContext.Provider value={{dailyAverage,
  setDailyAverage,
  calculateDailyAverage,
  isFirstTime, 
  setIsFirstTime,
  transactions,
  setTransactions,
  dailyLimit,
  setDailyLimit,
  startDate, 
  setStartDate,
  includedCategories,
  setIncludedCategories}}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () => {
  return (useContext(AppContext));
}