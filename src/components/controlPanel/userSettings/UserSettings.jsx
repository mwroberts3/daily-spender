import '../controlPanel.css'

const UserSettings = () => {
  return (
    <div className='us'>
      <div className="us-edit-btns">
        <button>Reset</button>
        <button>Change</button>
      </div>
      <div className="us-stat-line">
        <span>Start: 07/17/2022</span> <span>Limit: $27.40</span>
      </div>

    </div>
  )
}

export default UserSettings