import RecentDisplay from "./recentDisplay/RecentDisplay"
import UserCategories from "./userCategories/UserCategories";
import {useState} from 'react'

const ControlPanel = ({transactions, includedCategories, setIncludedCategories}) => {
  const [dailyAverage, setDailyAverage] = useState(0);
  const [showUserCategories, setShowUserCategories] = useState(false);

  return (
    <div className="cp">
      <div className='cpb'>
        <div className="cpb-edit-btns">
          <button onClick={() => setShowUserCategories(!showUserCategories)}>
            {showUserCategories ? 'Close' : 'Settings'}
          </button>
          <button>Logout</button>
      </div>
    { showUserCategories && <UserCategories transactions={transactions} includedCategories={includedCategories} setIncludedCategories={setIncludedCategories}/> }
      <div className="cpb-stat-line">
        <span>Since 7-27-2022</span> <span>~${Math.round(dailyAverage)} / $27.40</span>
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
