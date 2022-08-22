import Balance from "./components/balance/Balance";
import ControlPanel from "./components/controlPanel/ControlPanel";
import Header from "./components/header/Header";
import { useState } from 'react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState('2022-07-27');
  const [includedCategories, setIncludedCategories] = useState([
    'Dining Out',
    'Fun Money',
    'Regretful Impulse Purchases',
    'Groceries & Huel',
    'Subscriptions and Phone Bill',
    'Transportation',
    'Snake Care',
    'Stuff I Forgot to Budget For'
  ]);

  return (
    <div className="App">
      <Header />
      <ControlPanel 
        transactions={transactions}
        includedCategories={includedCategories}
        setIncludedCategories={setIncludedCategories}
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
