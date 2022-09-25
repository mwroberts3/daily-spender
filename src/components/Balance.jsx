import { useFetchBalance } from '../useFetchBalance';
import '../global.css'

const Balance = () => {
  const {balance, prevDayBalance} = useFetchBalance();

  return (
    <div className='b'>
      <p className={
        balance < 0 ? 'b-neg-2' : balance < prevDayBalance ? 'b-neg-1' : 'b-pos'}> 
        {balance !== 0 ? `$${balance}` : 'loading...'}
      </p>
    </div>
  )
}

export default Balance