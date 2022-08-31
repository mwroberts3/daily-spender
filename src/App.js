import Balance from "./components/balance/Balance"
import ControlPanel from "./components/controlPanel/ControlPanel"
import FirstTimeSetup from "./components/firstTimeSetup/FirstTimeSetup"
import Header from "./components/header/Header"
import { useState } from 'react'
import moment from 'moment'

function App() {
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

    // make sure false for real functionality
    return true;
  });

  if (isFirstTime) {
    return (
      <div className="App">
      <Header />
      <FirstTimeSetup 
        isFirstTime={isFirstTime}
        setIsFirstTime={setIsFirstTime}
        transactions={transactions}
        includedCategories={includedCategories}
        setIncludedCategories={setIncludedCategories}
        startDate={startDate}
        setStartDate={setStartDate}
        dailyLimit={dailyLimit}
        setDailyLimit={setDailyLimit}
        dailyAverage={0}/>

      {/* to load categories, think of something better */}
      <section style={{display: 'none'}}>
        <Balance dailyLimit={dailyLimit} setTransactions={setTransactions} includedCategories={includedCategories} startDate={startDate}/> 
      </section>
    </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <ControlPanel 
        transactions={transactions}
        includedCategories={includedCategories}
        setIncludedCategories={setIncludedCategories}
        startDate={startDate}
        setStartDate={setStartDate}
        dailyLimit={dailyLimit}
        setDailyLimit={setDailyLimit}
        isFirstTime={isFirstTime}
      />
      <Balance 
        dailyLimit={dailyLimit}
        setTransactions={setTransactions} 
        includedCategories={includedCategories}
        startDate={startDate}
      /> 
    </div>
  );
}

export default App;
