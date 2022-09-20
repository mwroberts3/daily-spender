import {useState, useEffect} from 'react'
import './firstTimeSetup.css'
import StartDate from '../controlPanel/StartDate'
import UserCategories from '../controlPanel/userCategories/UserCategories'
import DailyLimit from '../controlPanel/DailyLimit'
import { useGlobalContext } from '../../context'


const FirstTimeSetup = () => {
  const {isFirstTime,setIsFirstTime, transactions, includedCategories, setIncludedCategories, startDate, setStartDate, dailyAverage, dailyLimit, setDailyLimit} = useGlobalContext();

  const [dailyLimitDecided, setDailyLimitDecided] = useState(false);
  const [startDateDecided, setStartDateDecided] = useState(false);
  const [categoriesDecided, setCategoriesDecided] = useState(false);

  return (
    <div className='fts'>
      <section className='fts-settings'>
        {!dailyLimitDecided && 
        <>
        What's the most you want to spend per day?
        <DailyLimit dailyAverage={dailyAverage}dailyLimit={dailyLimit} setDailyLimit={setDailyLimit} setDailyLimitDecided={setDailyLimitDecided}/>
        </>}

        {dailyLimitDecided &&       
        <>
        <DailyLimit dailyAverage={dailyAverage}dailyLimit={dailyLimit} setDailyLimit={setDailyLimit} setDailyLimitDecided={setDailyLimitDecided}/>

        Please select a starting date:
        <StartDate startDate={startDate} setStartDate={setStartDate} setStartDateDecided={setStartDateDecided}/>
        </>}
      </section>
      {startDateDecided && 
      <UserCategories isFirstTime={isFirstTime}
      setIsFirstTime={setIsFirstTime}
      transactions={transactions} includedCategories={includedCategories} setIncludedCategories={setIncludedCategories}
      categoriesDecided={categoriesDecided} setCategoriesDecided={setCategoriesDecided}/>}
    </div>
  )
}

export default FirstTimeSetup