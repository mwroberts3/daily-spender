import Balance from "./components/balance/Balance";
import ControlPanel from "./components/controlPanel/ControlPanel";
import Header from "./components/header/Header";
import { useState } from 'react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [excludedCategories, setExcludedCategories] = useState([
    'Inflow: Ready to Assign',
    'Rent/Mortgage',
    'Utilities',
    'Crypto Investment $309 per month',
    'Betterment Investment, at least $500 per month',
    'Wellness',
    'New (used) Car',
    'Car Care / Auto Insurance Fund',
    'Fitness',
    'Education',
    'Vacation',
    'Starting Balance',
    'Reconciliation Balance Adjustment',
  ]);
  const [startDate, setStartDate] = useState('2022-07-27');

  return (
    <div className="App">
      <Header />
      <ControlPanel 
        transactions={transactions}
        excludedCategories={excludedCategories}
        setExcludedCategories={setExcludedCategories}
      />
      <Balance 
        setTransactions={setTransactions} 
        excludedCategories={excludedCategories}
        startDate={startDate}
      /> 
    </div>
  );
}

export default App;
