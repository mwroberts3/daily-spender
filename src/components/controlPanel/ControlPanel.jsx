import RecentDisplay from "./recentDisplay/RecentDisplay"
import UserCategories from "./userCategories/UserCategories";
import {useState} from 'react'

const ControlPanel = ({transactions, includedCategories, setIncludedCategories, startDate, setStartDate, dailyLimit, setDailyLimit}) => {
  const [dailyAverage, setDailyAverage] = useState(0);
  const [showUserCategories, setShowUserCategories] = useState(false);

  const closeAndSaveUserCategories = () => {
    localStorage.setItem('includedCategories', JSON.stringify(includedCategories));
    setShowUserCategories(!showUserCategories);
  }

  const changeStartDate = () => {
    console.log('...so, you want to change the start date?');
  }

  const changeDailyLimit = () => {
    console.log('...so, you want to change the daily limit?')
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
    { showUserCategories && <UserCategories transactions={transactions} includedCategories={includedCategories} setIncludedCategories={setIncludedCategories}/> }
      <div className="cpb-stat-line">
        <span className='pointer' onClick={changeStartDate}>Since {startDate}</span> <span>~${Math.round(dailyAverage)} / <span className="pointer" onClick={changeDailyLimit}>${dailyLimit}</span></span>
      </div>
    </div>
      <RecentDisplay 
        transactions={transactions}
        includedCategories={includedCategories}
        setDailyAverage={setDailyAverage}
      />
    </div>
  )
}

export default ControlPanel
