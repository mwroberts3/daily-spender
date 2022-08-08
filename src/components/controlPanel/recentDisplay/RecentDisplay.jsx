import '../controlPanel.css'
import moment from 'moment'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const RecentDisplay = ({transactions, excludedCategories}) => {  
  // will need to pass in the start date and spending limit as well
  const [dayCount, setDayCount] = useState(5);
  let transByDate = [];
  let fourRecentDates = [];
  
  const getFourMostRecentTrans = (dayCount) => {
    let totalsDaysofUse = transByDate.length;

    // need to put in safeties if user has less than 4 days
    fourRecentDates.splice(0);

    transByDate.forEach((date) => {
      if (date.id > totalsDaysofUse - dayCount) {
        fourRecentDates.push(date)
      }
    })

    if (fourRecentDates.length > 4) {
      fourRecentDates.splice(fourRecentDates.length-(dayCount-5));
    }

    // condense data for cleaner HTML in return
    fourRecentDates.forEach((date) => {
      date.date = date.date.substring(5, date.date.length);
      date.total = date.total / 1000;
    })
  }

  const previousDay = () => {
    let dayCountIncrease = dayCount + 1;

    setDayCount(dayCountIncrease);
    getFourMostRecentTrans(dayCount);
  }
  
  const nextDay = () => {
    let dayCountDecrease = dayCount - 1;
  
    setDayCount(dayCountDecrease);
    getFourMostRecentTrans(dayCount);

  }

  const transByDateSeparation = () => {
    let dates = [];

    for (let i=0; i<transactions.length; i++) {
      dates.push(transactions[i].date);
    }

    let currentDate = moment().format('YYYY-MM-DD');

    dates.push(currentDate);
    dates = [...new Set(dates)];

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
      {fourRecentDates.map((item) => {
        const { id, date, total } = item;
        return (
          <div className="rd-unit" key={id}>
            <p className='rd-unit-date'>{date}</p>
            <p className={total < -27.40 ? 'b-neg-2' : 'b-pos'}>${total}</p>
          </div>
        )})}
      <div className="rd-arrow-right">
        <FaChevronRight onClick={nextDay}/>
      </div>
   </div>
  )
}

export default RecentDisplay