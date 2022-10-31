import { useState } from 'react'
import Balance from "./components/Balance"
import ControlPanel from "./components/control-panel/ControlPanel"
import FirstTimeSetup from "./components/FirstTimeSetup"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useGlobalContext } from './context'

function App() {
  const { isFirstTime } = useGlobalContext();
  const [token, setToken] = useState('');

  if (!token) {
    if (window.location.href.includes('token=')) {
      let access_token = window.location.href.split('http://localhost:3000/#access_token=');
      // let access_token = window.location.href.split('https://ynab-daily-spender.netlify.app/#access_token=');
      access_token = access_token[1].split('&token_type=Bearer&expires_in=7200');
      access_token = access_token[0];
      setToken(access_token);
      // window.location.href = 'http://localhost:3000'
    }
    
    // will need to check if authorized by YNAB user and request a token if needed, regardless if first or nth time using app
    return (
      <div className='App'>
        <div className='app-wrapper'>
          <Header />
          <section className='app-login'>
            <button>
              <a href='https://app.youneedabudget.com/oauth/authorize?client_id=_4jwptmM2jY9dfy0j2f7AnUSMHJjIDcGEIgqw9nYiiM&redirect_uri=http://localhost:3000/&response_type=token'>please authorize use of Daily Spender</a>
            </button>
            {/* <a href='https://app.youneedabudget.com/oauth/authorize?client_id=_4jwptmM2jY9dfy0j2f7AnUSMHJjIDcGEIgqw9nYiiM&redirect_uri=https://ynab-daily-spender.netlify.app/&response_type=token'>please authorize use of Daily Spender</a> */}
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
          <Balance token={token}/> 
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
        <ControlPanel token={token}/>
      </div>
        <Footer />
    </div>
  );
}

export default App;
