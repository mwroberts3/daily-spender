import React from 'react'
import {useState, useEffect} from 'react'

const UserSettings = ({transactions}) => {
  const [allCategoryNames, setAllCategoryNames] = useState([]);
  
  useEffect(() => {
    let tempArray = [];
    console.log(transactions);

    transactions.forEach((trans) => {
      tempArray.push(trans.category_name);
    })

    setAllCategoryNames([...new Set(tempArray)])
  }, [transactions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('form submitted');
  }

  return (
    <div className='us'>
      {/* list different user categories and allow user to select which ones they want include in the daily limit */}
      <form onSubmit={handleSubmit}>
        {
          allCategoryNames.map((name) => {
            return (
              <div className='us-cate-name'>
                <input type='checkbox' name={name} />
                <label for={name}>{name}</label>
              </div>
            )
          })
        }
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default UserSettings