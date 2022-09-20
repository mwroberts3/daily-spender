import Balance from "./components/balance/Balance"
import ControlPanel from "./components/controlPanel/ControlPanel"
import FirstTimeSetup from "./components/firstTimeSetup/FirstTimeSetup"
import Header from "./components/header/Header"
import { useGlobalContext } from './context'

function App() {
  const { isFirstTime } = useGlobalContext();

  if (isFirstTime) {
    return (
      <div className="App">
      <Header />
      <FirstTimeSetup />

      <section style={{display: 'none'}}>
        <Balance /> 
      </section>
    </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <ControlPanel />
      <Balance /> 
    </div>
  );
}

export default App;
