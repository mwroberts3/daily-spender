import Balance from "./components/balance/Balance";
import ControlPanel from "./components/controlPanel/ControlPanel";
import Header from "./components/header/Header";
import { useState } from 'react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [excludedCategories, setExcludedCategories] = useState([
    'Inflow: Ready to Assign',
    'Rent/Mortgage',
    'Betterment Investment, at least $500 per month',
    'HUEL',
    'Wellness'
  ]);

  return (
    <div className="App">
      <Header />
      <ControlPanel 
        transactions={transactions}
        excludedCategories={excludedCategories}
        setExcludedCategories={setExcludedCategories}
      />
      <Balance 
        setTransactions={setTransactions} excludedCategories={excludedCategories}
      /> 
    </div>
  );
}

export default App;
