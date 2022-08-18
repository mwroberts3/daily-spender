import '../controlPanel.css'
import moment from 'moment'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const RecentDisplay = ({transactions, excludedCategories, setDailyAverage}) => {  
  // will need to pass in the start date and spending limit as well
  const [dayCount, setDayCount] = useState(5);
  const [showLeftChevron, setShowLeftChevron] = useState(true);
  const [showRightChevron, setShowRightChevron] = useState(false);
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
    });
  };

  const previousDay = () => {
    let lastMostRecent = fourRecentDates[fourRecentDates.length - 1].id;
    let lastAllTrans = transByDate[transByDate.length - 1].id;

    if (lastMostRecent > 3) {
      let dayCountIncrease = dayCount + 1;

      if (lastMostRecent <= 4) {
        setShowLeftChevron(false);
      }

      if (lastMostRecent <= lastAllTrans) {
        setShowRightChevron(true);
      }
  
      setDayCount(dayCountIncrease);
      getFourMostRecentTrans(dayCount);
    };
  };
  
  const nextDay = () => {
    let lastMostRecent = fourRecentDates[fourRecentDates.length - 1].id;
    let lastAllTrans = transByDate[transByDate.length - 1].id;

    if (lastMostRecent === lastAllTrans - 1) {
      setShowRightChevron(false);
    }

    if (lastMostRecent >= 3) {
        setShowLeftChevron(true);
      }

    if (lastMostRecent <= lastAllTrans - 1) {
      let dayCountDecrease = dayCount - 1;
    
      setDayCount(dayCountDecrease);
      getFourMostRecentTrans(dayCount); 
    };
  };

  const transByDateSeparation = () => {
    let dates = [];
    transactions.forEach((tran) => dates.push(tran.date));
    dates = [...new Set(dates), moment().format('YYYY-MM-DD')];

    // manually add date to array if no transactions
     for (let i=0; i<dates.length; i++) {
      if (i > 0) {

        if (new Date(dates[i]).getTime() - new Date(dates[i - 1]).getTime() > 86400000) {         
          console.log(moment(new Date(dates[i]).getTime()).format('YYYY-MM-DD'));

          dates.splice(i, 0, `${moment(new Date(dates[i]).getTime()).format('YYYY-MM-DD')}`)

          i--;
        }
      }
    };

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

  //  calculate and bubble up daily average
  // getting an console error, even though working...
   let testAvg = 0;  
   transByDate.forEach((tran) => {
    testAvg += tran.total
   })
   setDailyAverage(+((testAvg/transByDate.length) / 1000).toFixed(2));
  
   getFourMostRecentTrans(dayCount);
  }

  transByDateSeparation();

  return (
    <div className='rd'>
      <div className="rd-arrow-left">
        {showLeftChevron && <FaChevronLeft onClick={previousDay}/>}
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
        {showRightChevron && <FaChevronRight onClick={nextDay}/>}
      </div>
   </div>
  )
}

export default RecentDisplay