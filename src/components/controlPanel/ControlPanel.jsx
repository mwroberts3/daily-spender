import RecentDisplay from "./recentDisplay/RecentDisplay"
import UserSettings from "./userSettings/UserSettings"

const ControlPanel = ({transactions}) => {
  return (
    <div className="cp">
      <UserSettings />
      <RecentDisplay transactions={transactions}/>
    </div>
  )
}

export default ControlPanel
