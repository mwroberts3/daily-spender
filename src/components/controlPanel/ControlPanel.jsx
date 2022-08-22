import RecentDisplay from "./recentDisplay/RecentDisplay"
import UserSettings from "./userSettings/UserSettings";
import {useState} from 'react'

const ControlPanel = ({transactions, includedCategories, setIncludedCategories}) => {
  const [dailyAverage, setDailyAverage] = useState(0);

  return (
    <div className="cp">
      <div className='cpb'>
        <div className="cpb-edit-btns">
          <button>Settings</button>
          <button>Logout</button>
      </div>
      <UserSettings transactions={transactions}/>
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
