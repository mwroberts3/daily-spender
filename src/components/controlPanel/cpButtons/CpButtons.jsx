import '../controlPanel.css'

const CpButtons = ({ setExcludedCategories }) => {
  return (
    <div className='cpb'>
      <div className="cpb-edit-btns">
        <button>Settings</button>
        <button>Logout</button>
      </div>
      <div className="cpb-stat-line">
        <span>Since 7-27-2022</span> <span>$27.40</span>
      </div>
    </div>
  )
}

export default CpButtons