import RecentDisplay from "./recentDisplay/RecentDisplay"
import UserSettings from "./userSettings/UserSettings"

const ControlPanel = ({transactions, excludedCategories, setExcludedCategories}) => {
  return (
    <div className="cp">
      <UserSettings 
        setExcludedCategories={setExcludedCategories}
      />
      <RecentDisplay 
        transactions={transactions}
        excludedCategories={excludedCategories}
      />
    </div>
  )
}

export default ControlPanel
