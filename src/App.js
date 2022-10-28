import Balance from "./components/Balance"
import ControlPanel from "./components/control-panel/ControlPanel"
import FirstTimeSetup from "./components/FirstTimeSetup"
import Header from "./components/Header"
import Footer from "./components/Footer"
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
      <div className="app-wrapper">
        <Header />
        <ControlPanel />
      </div>
        <Footer />
    </div>
  );
}

export default App;
