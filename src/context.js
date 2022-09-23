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

  const [dailyAverage, setDailyAverage] = useState(0);

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

  const [dailyLimitDecided, setDailyLimitDecided] = useState(false);

  const [startDateDecided, setStartDateDecided] = useState(false);

  const [categoriesDecided, setCategoriesDecided] = useState(false);

  return <AppContext.Provider value={{dailyAverage,
  setDailyAverage,
  isFirstTime, 
  setIsFirstTime,
  transactions,
  setTransactions,
  dailyLimit,
  setDailyLimit,
  startDate, 
  setStartDate,
  includedCategories,
  setIncludedCategories,
  dailyLimitDecided,
  setDailyLimitDecided,
  startDateDecided,
  setStartDateDecided,
  categoriesDecided,
  setCategoriesDecided}}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () => {
  return (useContext(AppContext));
}