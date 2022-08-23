import RecentDisplay from "./recentDisplay/RecentDisplay"
import UserSettings from "./userSettings/UserSettings";
import {useState} from 'react'

const ControlPanel = ({transactions, includedCategories, setIncludedCategories}) => {
  const [dailyAverage, setDailyAverage] = useState(0);
  const [showUserSettings, setShowUserSettings] = useState(false);

  return (
    <div className="cp">
      <div className='cpb'>
        <div className="cpb-edit-btns">
          <button onClick={() => setShowUserSettings(!showUserSettings)}>
            {showUserSettings ? 'Close' : 'Settings'}
          </button>
          <button>Logout</button>
      </div>
    { showUserSettings && <UserSettings transactions={transactions} includedCategories={includedCategories} setIncludedCategories={setIncludedCategories} setShowUserSettings={setShowUserSettings}/> }
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
