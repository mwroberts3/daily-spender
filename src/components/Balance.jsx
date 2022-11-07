import { useFetchBalance } from '../useFetchBalance';
import '../global.css'
import { useGlobalContext } from '../context';
import { useMemo } from 'react';

const Balance = () => {
  const { token, dailyLimit, todaysTransTotal, transactions } = useGlobalContext();
  const { isLoading, isError, balance } = useFetchBalance(token);
  
  const balanceClass = useMemo(() => {
    console.log(transactions);
    
    // if (todaysTransTotal.current) {
    //   const liveTotal = +-todaysTransTotal.current.textContent.substring(1);

    //   if (liveTotal > dailyLimit && balance > 0) return 'b-neg-1';
    //   if (liveTotal < dailyLimit && balance > 0) return 'b-pos';
    //   return 'b-neg-2';
    // }

    // return 'b-loading-2';

    if (balance > 0) return 'b-pos';
    if (balance < 0) return 'b-neg-2';
  }, [transactions, dailyLimit, balance, todaysTransTotal]);

  const Loading = () => {
    return <span className='b-loading'>...loading</span>;
  }

  const Error = () => {
    return <span className='b-error'>error connecting</span>
  }

  return (
    <div className='b'>
      <p className={balanceClass}> 
        {isError ? <Error /> : 
        isLoading ? <Loading /> : `$${balance}`}
      </p>
    </div>
  )
}

export default Balance