import React from 'react'

const Footer = ({link, setViewPrivacyPolicy}) => {
  const getPrivacyPolicy = () => {
    if (link === 'Home') {
      setViewPrivacyPolicy(false);
    } else {
      setViewPrivacyPolicy(true);
    }
  }

  return (
    <footer>
      Your Daily Spender v1.0.0 2022 <span onClick={getPrivacyPolicy}>{link}</span>
    </footer>
  )
}

export default Footer