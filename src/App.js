import Balance from "./components/balance/Balance";
import ControlPanel from "./components/controlPanel/ControlPanel";
import Header from "./components/header/Header";
import { useState } from 'react';

function App() {
  const [transactions, setTransactions] = useState([]);

  return (
    <div className="App">
      <Header />
      <ControlPanel transactions={transactions}/>
      <Balance setTransactions={setTransactions}/>
    </div>
  );
}

export default App;
