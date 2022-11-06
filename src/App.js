import { useState } from 'react';
import Balance from "./components/Balance"
import ControlPanel from "./components/control-panel/ControlPanel"
import FirstTimeSetup from "./components/FirstTimeSetup"
import PrivacyPolicy from './components/PrivacyPolicy';
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useGlobalContext } from './context'

const devURL = 'https://app.youneedabudget.com/oauth/authorize?client_id=_4jwptmM2jY9dfy0j2f7AnUSMHJjIDcGEIgqw9nYiiM&redirect_uri=http://localhost:3000/&response_type=token';

const productionURL = 'https://app.youneedabudget.com/oauth/authorize?client_id=_4jwptmM2jY9dfy0j2f7AnUSMHJjIDcGEIgqw9nYiiM&redirect_uri=https://ynab-daily-spender.netlify.app/&response_type=token';

function App() {
  const { isFirstTime, token } = useGlobalContext();
  const [viewPrivacyPolicy, setViewPrivacyPolicy] = useState(false);

  if (viewPrivacyPolicy) { 
    return <PrivacyPolicy setViewPrivacyPolicy={setViewPrivacyPolicy}/>
  }

  if (!token) {   
    return (
      <div className='App'>
        <div className='app-wrapper'>
          <Header />
          <section className='app-login'>
              <a href={devURL}><button className='btn-style'>Authorize Your Daily Spender</button></a>
          </section>
        </div>
        <Footer link={'Privacy Policy'} setViewPrivacyPolicy={setViewPrivacyPolicy}/>
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
      <Footer link={'Privacy Policy'} setViewPrivacyPolicy={setViewPrivacyPolicy}/>
    </div>
    );
  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <Header />
        <ControlPanel />
      </div>
        <Footer link={'Privacy Policy'} setViewPrivacyPolicy={setViewPrivacyPolicy}/>
    </div>
  );
}

export default App;
