import React from 'react'
import {useState, useEffect} from 'react'

const UserCategories = ({transactions, includedCategories, setIncludedCategories, isFirstTime, setIsFirstTime}) => {
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

  const closeAndSaveUserCategories = () => {
    localStorage.setItem('includedCategories', JSON.stringify(includedCategories));

    setIsFirstTime(false);
  }

  const addCategory = (e) => {
    let checkedCategoryName = e.target.nextElementSibling.textContent;

    if (e.target.checked) {
      setIncludedCategories((categories) => [...categories, checkedCategoryName]);
    } else {
      setIncludedCategories((categories) => {
        return categories.filter((cate) => cate !== checkedCategoryName );
      });
    };
  };

  return (
    <div className='us'>
      <form>
        {allCategoryNames.map((category, index) => {
        return (
        <div className='us-cate-name' key={index}>
          <input type='checkbox' name={category} onChange={addCategory} checked={category.included}/>
          <label htmlFor={category}>{category.name}</label>
        </div>)})}
      </form>
      {isFirstTime && <button onClick={closeAndSaveUserCategories}>Submit</button>}
    </div>
  )
}

export default UserCategories