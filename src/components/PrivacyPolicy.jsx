import React from 'react'
import Header from './Header'
import Footer from './Footer'

const PrivacyPolicy = ({setViewPrivacyPolicy}) => {
  return (
    <div className='App'>
      <div className='app-wrapper privacy-policy'>
        <Header />
        <h3>Privacy Policy</h3>
        <p>The data obtained through the YNAB API is not save on a server or even in the browsers local storage.</p>
        <p>It is stored in the application's memory and is erased once the browser window is closed.</p>
        <p><em>Any YNAB data passed through Your Daily Spender will not unknowingly be passed to any third party.</em></p>
      </div>
      <Footer link={'Home'} setViewPrivacyPolicy={setViewPrivacyPolicy}/>
    </div>
  )
}

export default PrivacyPolicy