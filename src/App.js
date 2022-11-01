import Balance from "./components/Balance"
import ControlPanel from "./components/control-panel/ControlPanel"
import FirstTimeSetup from "./components/FirstTimeSetup"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useGlobalContext } from './context'

const devURL = 'https://app.youneedabudget.com/oauth/authorize?client_id=_4jwptmM2jY9dfy0j2f7AnUSMHJjIDcGEIgqw9nYiiM&redirect_uri=http://localhost:3000/&response_type=token';

const productionURL = 'https://app.youneedabudget.com/oauth/authorize?client_id=_4jwptmM2jY9dfy0j2f7AnUSMHJjIDcGEIgqw9nYiiM&redirect_uri=https://ynab-daily-spender.netlify.app/&response_type=token';

function App() {
  const { isFirstTime, token } = useGlobalContext();

  if (window.location.href.includes('privacy-policy')) { 
    return (
      <div className='App'>
        <div className='app-wrapper'>
          <p>Your Daily Spender - Privacy Policy</p>
        </div>
      </div>
    )
  }

  if (!token) {   
    return (
      <div className='App'>
        <div className='app-wrapper'>
          <Header />
          <section className='app-login'>
            <button>
              <a href={productionURL}>please authorize Your Daily Spender</a>
            </button>
          </section>
        </div>
        <Footer />
      </div>
    )
  }

  if (isFirstTime) {
    return (
    <div className="App">
      <div className='app-wrapper'>
        <Header />
        <FirstTimeSetup />

        <section style={{display: 'none'}}>
          <Balance /> 
        </section>
      </div>
      <Footer />
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
