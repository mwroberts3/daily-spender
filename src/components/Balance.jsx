import { useFetchBalance } from '../useFetchBalance';
import Loading from './Loading';
import '../global.css'
import { useGlobalContext } from '../context';

const Balance = () => {
  const {token} = useGlobalContext();
  
  const {isLoading, isError, balance, prevDayBalance} = useFetchBalance(token);

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