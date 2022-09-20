import React from 'react'
import {useState} from 'react'

const DailyLimit = ({dailyAverage, dailyLimit,setDailyLimit, setDailyLimitDecided}) => {
  const [isChangingDl, setIsChangingDl] = useState(false);

  const updateDailyLimit = (e) => {
    e.preventDefault();

    localStorage.setItem('dailyLimit', JSON.stringify(e.target.children[0].value));

    setDailyLimit(e.target.children[0].value);
    if (dailyLimit !== 0) setIsChangingDl(!isChangingDl);

    if (setDailyLimitDecided) {
      setDailyLimitDecided(true);
    }
  };

  if (!isChangingDl && dailyLimit !== 0) {
    return (
      <span className='dl'>
        ~${Math.round(dailyAverage)} / <span className="pointer" onClick={() => setIsChangingDl(!isChangingDl)}>${dailyLimit}</span>
      </span>
    )
  }

  return (
    <form className='dl' onSubmit={updateDailyLimit}> 
      <input type="number" autoFocus/>
      <button type='submit'>Update</button>
    </form>
  )
}

export default DailyLimit