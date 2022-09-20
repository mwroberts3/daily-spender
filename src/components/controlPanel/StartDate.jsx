import React from 'react'
import { useState } from 'react'

const StartDate = ({startDate, setStartDate, setStartDateDecided}) => {

  const [isChangingSd, setIsChangingSd] = useState(false);

  const updateStartDate = (e) => {
    e.preventDefault();

    if (e.target.children[0]) {
      let proposedStartDate = e.target.children[0].value;

      if (e.target.tagName === 'FORM' && proposedStartDate !== '') {    
        localStorage.setItem('startDate', JSON.stringify(proposedStartDate));
        
        setStartDate(proposedStartDate);
        setIsChangingSd(false); 
        setStartDateDecided(true); 
      }
    }
    
    
    setIsChangingSd(true);
  }

  if (!isChangingSd && startDate !== '') {
    return (
      <span className='pointer'>
        Since&nbsp;
        <span onClick={updateStartDate}>
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