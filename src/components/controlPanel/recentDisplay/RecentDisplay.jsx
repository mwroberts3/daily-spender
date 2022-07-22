import '../controlPanel.css'

const RecentDisplay = ({transactions}) => {
  console.log('trans test', transactions)

  return (
    <div className='rd'>
      <div className="rd-unit">
        <p>7/17</p>
        <p>$0</p>
      </div>
      <div className="rd-unit">
        <p>7/18</p>
        <p>$0</p>
      </div>
      <div className="rd-unit">
        <p>7/19</p>
        <p>$0</p>
      </div>
      <div className="rd-unit">
        <p>7/20</p>
        <p>$0</p>
      </div>
    </div>
  )
}

export default RecentDisplay