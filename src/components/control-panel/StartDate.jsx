import React from 'react'
import { useState } from 'react'
import { useGlobalContext } from '../../context';

const StartDate = () => {
  const { startDate, setStartDate, setStartDateDecided } = useGlobalContext();

  const [isChangingSd, setIsChangingSd] = useState(false);

  const updateStartDate = (e) => {
    e.preventDefault();

    let proposedStartDate = e.target.children[0].value;
    
    if (proposedStartDate !== '') {    
      localStorage.setItem('startDate', JSON.stringify(proposedStartDate));
          
      setStartDate(proposedStartDate);
      setIsChangingSd(false); 
      setStartDateDecided(true); 
    }
  }

  if (!isChangingSd && startDate !== '') {
    return (
      <span className='pointer'>
        Since&nbsp;
        <span onClick={() => setIsChangingSd(true)}>
          {startDate}
        </span>
      </span>
    )
  }

  return (
    <form className='sd' onSubmit={updateStartDate}>
      <input type="date" autoFocus/>
      <button type='submit'>Update</button>
    </form>
  )
}

export default StartDate