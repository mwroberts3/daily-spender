import Balance from "./components/Balance"
import ControlPanel from "./components/control-panel/ControlPanel"
import FirstTimeSetup from "./components/FirstTimeSetup"
import Header from "./components/Header"
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
