import RecentDisplay from "./recentDisplay/RecentDisplay"
import UserSettings from "./userSettings/UserSettings"

const ControlPanel = () => {
  return (
    <div className="cp">
      <UserSettings />
      <RecentDisplay />
    </div>
  )
}

export default ControlPanel
