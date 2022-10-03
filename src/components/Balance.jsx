import { useFetchBalance } from '../useFetchBalance';
import Loading from './Loading';
import '../global.css'

const Balance = () => {
  const {isLoading, isError, balance, prevDayBalance} = useFetchBalance();

  return (
    <div className='b'>
      <p className={
        balance < 0 ? 'b-neg-2' : balance < prevDayBalance ? 'b-neg-1' : 'b-pos'}> 
        {isError && 'error connecting'}
        {isLoading ? <Loading /> : `$${balance}`}
      </p>
    </div>
  )
}

export default Balance