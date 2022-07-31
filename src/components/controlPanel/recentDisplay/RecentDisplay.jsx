import '../controlPanel.css'
import moment from 'moment'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const RecentDisplay = ({transactions, excludedCategories}) => {  
  // will need to pass in the start date and limit as well
  const [dayCount, setDayCount] = useState(5);
  let transByDate = [];
  let fourRecentTrans = [];
  
  const getFourMostRecentTrans = (dayCount) => {
    let totalsDaysofUse = transByDate.length;
    // console.log(dayCount);

    // need to put in safeties if user has less than 4 days
    fourRecentTrans.splice(0);

    transByDate.forEach((date) => {
      if (date.id > totalsDaysofUse - dayCount) {
        fourRecentTrans.push(date)
      }
    })

    if (fourRecentTrans.length > 4) {
      fourRecentTrans.splice(fourRecentTrans.length-(dayCount-5));
    }

    console.log(fourRecentTrans)
  }

  const previousDay = () => {
    let dayCountIncrease = dayCount + 1

    setDayCount(dayCountIncrease);
    getFourMostRecentTrans(dayCount)
  }
  
  const nextDay = () => {
    let dayCountDecrease = dayCount - 1
  
    setDayCount(dayCountDecrease);
    getFourMostRecentTrans(dayCount)

  }

  const transByDateSeparation = () => {
    // console.log('test')

    let dates = [];

    for (let i=0; i<transactions.length; i++) {
      dates.push(transactions[i].date);
    }

    let currentDate = moment().format('YYYY-MM-DD')

    dates.push(currentDate)

    dates = [...new Set(dates)]

    // console.log(dates);

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

   getFourMostRecentTrans(dayCount);
  }

  transByDateSeparation();

  return (
    <div className='rd'>
      <div className="rd-arrow-left">
        <FaChevronLeft onClick={previousDay}/>
      </div>
      {fourRecentTrans.map((date) => (
      <div key={date.id} className="rd-unit">
        <p>{date.date.substring(5, date.date.length)}</p>
        <p>${date.total / 1000}</p>
      </div>
      ))}
      <div className="rd-arrow-right">
        <FaChevronRight onClick={nextDay}/>
      </div>
   </div>
  )
}

export default RecentDisplay