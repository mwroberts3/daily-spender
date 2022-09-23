import '../global.css'
import StartDate from './control-panel/StartDate'
import UserCategories from './UserCategories'
import DailyLimit from './control-panel/DailyLimit'
import { useGlobalContext } from '../context'


const FirstTimeSetup = () => {
  const { dailyLimitDecided, startDateDecided } = useGlobalContext();

  return (
    <div className='fts'>
      <section className='fts-settings'>
        {!dailyLimitDecided && 
        <>
        What's the most you want to spend per day?
        <DailyLimit />
        </>}

        {dailyLimitDecided &&       
        <>
        <DailyLimit />

        Please select a starting date:
        <StartDate />
        </>}
      </section>
      {startDateDecided && 
      <UserCategories />}
    </div>
  )
}

export default FirstTimeSetup