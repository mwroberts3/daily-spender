import RecentDisplay from "./RecentDisplay"
import UserCategories from "../UserCategories";
import DailyLimit from "./DailyLimit";
import StartDate from "./StartDate";
import {useState} from 'react'
import { useGlobalContext } from "../../context";


const ControlPanel = () => {
  const { includedCategories } = useGlobalContext();
  const [showUserCategories, setShowUserCategories] = useState(false);

  const closeAndSaveUserCategories = () => {
    localStorage.setItem('includedCategories', JSON.stringify(includedCategories));
    setShowUserCategories(!showUserCategories);
  }

   return (
    <div className="cp">
      <div className='cpb'>
        <div className="cpb-edit-btns">
          <button onClick={closeAndSaveUserCategories}>
            {showUserCategories ? 'Close' : 'Categories'}
          </button>
          <button>Logout</button>
      </div>
    {showUserCategories && <UserCategories />}
      <div className="cpb-stat-line">
        <StartDate /> 
        <DailyLimit />
      </div>
    </div>
      <RecentDisplay />
    </div>
  )
}

export default ControlPanel