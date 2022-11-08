import React, { useState, useContext, useRef } from 'react'
import moment from 'moment'

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
  const [token, setToken] = useState('');
  const devURL = 'http://localhost:3000/#access_token=';
  const productionURL = 'https://your-daily-spender.netlify.app/#access_token=';

  if (!token) {
  let access_token = window.location.href.split(devURL);
  if (window.location.href.includes('token=')) {
    access_token = access_token[1].split('&token_type=Bearer&expires_in=7200');
    access_token = access_token[0];
    setToken(access_token);
    // window.location.href = 'http://localhost:3000'
  }}

  const [transactions, setTransactions] = useState([]);
  const todaysTransTotal = useRef(null);

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

  return <AppContext.Provider value={{
  token,
  setToken,
  dailyAverage,
  setDailyAverage,
  isFirstTime, 
  setIsFirstTime,
  transactions,
  setTransactions,
  todaysTransTotal,
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