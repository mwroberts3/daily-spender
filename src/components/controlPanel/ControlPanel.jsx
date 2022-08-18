import RecentDisplay from "./recentDisplay/RecentDisplay"
import {useState} from 'react'

const ControlPanel = ({transactions, excludedCategories, setExcludedCategories}) => {
  const [dailyAverage, setDailyAverage] = useState(0);

  return (
    <div className="cp">
      <div className='cpb'>
        <div className="cpb-edit-btns">
          <button>Settings</button>
          <button>Logout</button>
      </div>
      <div className="cpb-stat-line">
        <span>Since 7-27-2022</span> <span>~${Math.round(dailyAverage)} / $27.40</span>
      </div>
    </div>
      <RecentDisplay 
        transactions={transactions}
        excludedCategories={excludedCategories}
        setDailyAverage={setDailyAverage}
      />
    </div>
  )
}

export default ControlPanel
