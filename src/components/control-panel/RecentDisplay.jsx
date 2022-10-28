import '../../global.css'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { useGlobalContext } from '../../context'
import Balance from '../Balance'

const RecentDisplay = () => {  
  const { transactions, includedCategories, dailyLimit } = useGlobalContext();

  // will need to pass in the start date and spending limit as well
  const dayCount = 5;
  const transByDate = [];
  const fourRecentDates = [];
  
  const getFourMostRecentTrans = (dayCount) => {
    let totalsDaysofUse = transByDate.length;

    // need to put in safeties if user has less than 4 days
    fourRecentDates.splice();

    transByDate.forEach((date) => {
      if (date.id > totalsDaysofUse - dayCount) {
        fourRecentDates.push(date)
      }
    })

    if (fourRecentDates.length > 4) {
      fourRecentDates.splice(fourRecentDates.length-(dayCount-5));
    }

    // condense data for cleaner HTML in return
    transByDate.forEach((date) => {
      date.date = date.date.substring(5, date.date.length);
      date.total = date.total / 1000;
    });
  };

  const transByDateSeparation = () => {
    let dates = [];
    transactions.forEach((tran) => dates.push(tran.date));
    dates = [...new Set(dates)];

    // add current date at start of day
    if (dates[dates.length-1] !== moment().format('YYYY-MM-DD')) {
      dates.push(moment().format('YYYY-MM-DD'))
    }

    // manually add date to array if no transactions
     for (let i=0; i<dates.length; i++) {
      if (i > 0) {

        if (new Date(dates[i]).getTime() - new Date(dates[i - 1]).getTime() > 86400000) {         
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
          if (includedCategories.includes(transactions[k].category_name)) {
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
  

  if (transByDate.length > 1){
    return (
      <div className='rd'>
        {transByDate.reverse().map((item) => {
          const { id, date, total } = item;
            return <div className="rd-unit" key={id}>
                <p className='rd-unit-date'>{date}</p>
                <p className={total < -dailyLimit ? 'b-neg-2' : 'b-pos'}>${total}</p>
              </div>
          
          })}
     </div>
    )
  }
}

export default RecentDisplay