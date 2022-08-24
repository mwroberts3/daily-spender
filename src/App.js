import Balance from "./components/balance/Balance";
import ControlPanel from "./components/controlPanel/ControlPanel";
import Header from "./components/header/Header";
import { useState } from 'react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState('2022-07-27');
  const [dailyLimit, setDailyLimit] = useState(27.40);
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
        setTransactions={setTransactions} 
        includedCategories={includedCategories}
        startDate={startDate}
      /> 
    </div>
  );
}

export default App;
