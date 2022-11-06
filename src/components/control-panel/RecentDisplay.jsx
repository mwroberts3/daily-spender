import '../../global.css'
import moment from 'moment'
import { useGlobalContext } from '../../context'

const RecentDisplay = () => {  
  const { transactions, includedCategories, dailyLimit, todaysTransTotal } = useGlobalContext();

  const transByDate = [];
  
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

          // check for split transactions
          if (transactions[k].subtransactions.length > 0) {
            for (let j=0; j<transactions[k].subtransactions.length; j++) {
              if (includedCategories.includes(transactions[k].subtransactions[j].category_name)) {
                tempAmount += transactions[k].subtransactions[j].amount;
                transCount++;
              }
            }
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

    // condense data for cleaner HTML in return
    transByDate.forEach((date) => {
      date.date = date.date.substring(5, date.date.length);
      date.total = date.total / 1000;
    });
  }

  transByDateSeparation();
  
  if (transByDate.length > 1){
    return (
      <div className='rd'>
        {transByDate.reverse().map((item, index) => {
          const { id, date, total } = item;

          if (index === 0) {
            return <div className='rd-unit' key={id}>
              <p className='rd-unit-date'>{date}</p>
              <p className={total < -dailyLimit ? 'b-neg-2' : 'b-pos'} ref={todaysTransTotal}>${total}</p>
            </div>
          }
          return <div className='rd-unit' key={id}>
            <p className='rd-unit-date'>{date}</p>
            <p className={total < -dailyLimit ? 'b-neg-2' : 'b-pos'}>${total}</p>
          </div>

          
          })}
     </div>
    )
  }
}

export default RecentDisplay