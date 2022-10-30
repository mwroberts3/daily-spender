import Balance from "./components/Balance"
import ControlPanel from "./components/control-panel/ControlPanel"
import FirstTimeSetup from "./components/FirstTimeSetup"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useGlobalContext } from './context'

function App() {
  const { isFirstTime } = useGlobalContext();

  if (isFirstTime) {

    console.log(window.location.href);

    if (window.location.href.includes('token=')) {
      let access_token = window.location.href.split('http://localhost:3000/#access_token=');
      access_token = access_token[1].split('&token_type=Bearer&expires_in=7200');
      access_token = access_token[0];
      console.log(access_token);
    }

    // 'https://app.youneedabudget.com/oauth/authorize?client_id=_4jwptmM2jY9dfy0j2f7AnUSMHJjIDcGEIgqw9nYiiM&redirect_uri=http://localhost:3000/&response_type=token'

    // will need to check if authorized by YNAB user and request a token if needed, regardless if first or nth time using app
    return (
      <a href='https://app.youneedabudget.com/oauth/authorize?client_id=_4jwptmM2jY9dfy0j2f7AnUSMHJjIDcGEIgqw9nYiiM&redirect_uri=http://localhost:3000/&response_type=token'>please authorize use of Daily Spender</a>
    )
    


    // return (
    // <div className="App">
    //   <Header />
    //   <FirstTimeSetup />

    //   <section style={{display: 'none'}}>
    //     <Balance /> 
    //   </section>
    // </div>
    // );
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
