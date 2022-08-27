import Balance from "./components/balance/Balance"
import ControlPanel from "./components/controlPanel/ControlPanel"
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

    return '2022-07-27';
  });
  const [includedCategories, setIncludedCategories] = useState(() => {
    if (localStorage.getItem('includedCategories')) {
      return JSON.parse(localStorage.getItem('includedCategories'));
    }

    return [];
  });

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
