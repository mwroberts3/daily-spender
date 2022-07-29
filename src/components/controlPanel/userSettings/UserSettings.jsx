import '../controlPanel.css'

const UserSettings = ({ setExcludedCategories }) => {
  return (
    <div className='us'>
      <div className="us-edit-btns">
        <button>Settings</button>
        <button>Logout</button>
      </div>
      <div className="us-stat-line">
        <span>Since 7-27-2022</span> <span>$27.40</span>
      </div>
    </div>
  )
}

export default UserSettings