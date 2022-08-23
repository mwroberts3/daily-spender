import React from 'react'
import {useState, useEffect} from 'react'

const UserSettings = ({transactions, includedCategories, setIncludedCategories, setShowUserSettings}) => {
  const [allCategoryNames, setAllCategoryNames] = useState([]);
  
  useEffect(() => {
    let tempArray = [];
    let tempArray2 = [];

    transactions.forEach((trans) => {
      tempArray.push(trans.category_name);
    })
    
    tempArray = [...new Set(tempArray)];
    
    tempArray.forEach((trans) => {
      if (includedCategories.includes(trans)) {
        tempArray2.push({name: trans, included: true});
      } else {
        tempArray2.push({name: trans, included: false});
      }
    })

    setAllCategoryNames(tempArray2);
  }, [transactions, includedCategories]);

  const addCategory = (e) => {
    let checkedCategoryName = e.target.nextElementSibling.textContent;
    let tempCategories = includedCategories;

    if (e.target.checked) {
      tempCategories.push(checkedCategoryName);
      setIncludedCategories(tempCategories);
    } else {
      tempCategories = tempCategories.filter((category) => category !== checkedCategoryName);

    setIncludedCategories(tempCategories);
    }
  }

  return (
    <div className='us'>
      {/* list different user categories and allow user to select which ones they want include in the daily limit */}
      <form>
        {
          allCategoryNames.map((category, index) => {
            return (
              <div className='us-cate-name' key={index}>
                <input type='checkbox' name={category} onChange={addCategory} checked={category.included}/>
                <label htmlFor={category}>{category.name}</label>
              </div>
            )
          })
        }
      </form>
    </div>
  )
}

export default UserSettings