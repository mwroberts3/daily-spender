import RecentDisplay from "./recentDisplay/RecentDisplay"
import UserCategories from "./userCategories/UserCategories";
import DailyLimit from "./DailyLimit";
import StartDate from "./StartDate";
import {useState} from 'react'
import { useGlobalContext } from "../../context";


const ControlPanel = () => {
  const {dailyAverage, setDailyAverage, transactions, includedCategories, setIncludedCategories, startDate, setStartDate, dailyLimit, setDailyLimit, isFirstTime} = useGlobalContext();
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
    { showUserCategories && <UserCategories transactions={transactions} includedCategories={includedCategories} setIncludedCategories={setIncludedCategories} 
    isFirstTime={isFirstTime}/> }
      <div className="cpb-stat-line">
        <StartDate startDate={startDate} setStartDate={setStartDate}/> 
        <DailyLimit dailyAverage={dailyAverage}dailyLimit={dailyLimit} setDailyLimit={setDailyLimit}/>
      </div>
    </div>
      <RecentDisplay 
        transactions={transactions}
        includedCategories={includedCategories}
        setDailyAverage={setDailyAverage}
        dailyLimit={dailyLimit}
      />
    </div>
  )
}

export default ControlPanel
