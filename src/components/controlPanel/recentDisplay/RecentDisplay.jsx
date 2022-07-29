import '../controlPanel.css'
import moment from 'moment'

const RecentDisplay = ({transactions, excludedCategories}) => {

  // will need to pass in the start date and limit as well
  let transByDate = [];
  let fourRecentTrans = [];
  const transByDateSeparation = () => {
    let dates = [];

    for (let i=0; i<transactions.length; i++) {
      dates.push(transactions[i].date);
    }

    let currentDate = moment().format('YYYY-MM-DD')

    dates.push(currentDate)

    dates = [...new Set(dates)]

    console.log(dates);

    let tempAmount = 0;
    let transCount = 1;

    for (let i=0; i<dates.length; i++) {
      for (let k=transCount - 1; k<transactions.length; k++) {
        if (dates[i] === transactions[k].date) {
          if (!excludedCategories.includes(transactions[k].category_name) && !excludedCategories.includes(transactions[k].payee_name)) {
            tempAmount += transactions[k].amount;
            transCount++;
          }
        }
        
        if (k === transactions.length - 1) {
          transByDate.push({id: i, date: dates[i], total: tempAmount});

          tempAmount = 0;
        }
      }
   }

   if (dates.length > transByDate.length) {
    transByDate.push({
      id: dates.length,
      date: dates[dates.length-1],
      total: 0
    })
   }
  }

  transByDateSeparation();

  // need to put in safeties if user has less than 4 days
  let totalsDaysofUse = transByDate.length;
  transByDate.forEach((date) => {
    if (date.id > totalsDaysofUse - 5) {
      fourRecentTrans.push(date)
    }
  })

  console.log(transByDate)

  return (
    <div className='rd'>
      {fourRecentTrans.map((date) => (
      <div key={date.id} className="rd-unit">
        <p>{date.date.substring(5, date.date.length)}</p>
        <p>${date.total / 1000}</p>
      </div>
      ))}
   </div>
  )
}

export default RecentDisplay