import RecentDisplay from "./RecentDisplay"
import UserCategories from "../UserCategories";
import DailyLimit from "./DailyLimit";
import StartDate from "./StartDate";
import Balance from "../Balance";
import {useState} from 'react'
import { useGlobalContext } from "../../context";

const devURL = 'http://localhost:3000';
const productionURL = 'https://ynab-daily-spender.netlify.app/';

const ControlPanel = () => {
  const { includedCategories } = useGlobalContext();
  const [showUserCategories, setShowUserCategories] = useState(false);

  const closeAndSaveUserCategories = () => {
    localStorage.setItem('includedCategories', JSON.stringify(includedCategories));
    setShowUserCategories(!showUserCategories);
  }

  const logout = () => {
    window.location.href = devURL;
  }

   return (
    <div className="cp">
      <div className='cpb'>
        <div className="cpb-edit-btns">
          <button className='btn-style' onClick={closeAndSaveUserCategories}>
            {showUserCategories ? 'Close' : 'Categories'}
          </button>
          <button className='btn-style' onClick={logout}>Logout</button>
      </div>
    {showUserCategories && <UserCategories />}
      <div className="cpb-stat-line">
        <StartDate /> 
        <DailyLimit />
      </div>
    </div>
      <Balance />
      <RecentDisplay />
    </div>
  )
}

export default ControlPanel
