import RecentDisplay from "./recentDisplay/RecentDisplay"
import CpButtons from "./cpButtons/CpButtons"

const ControlPanel = ({transactions, excludedCategories, setExcludedCategories}) => {
  return (
    <div className="cp">
      <CpButtons 
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
