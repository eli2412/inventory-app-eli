import React, { useEffect, useState} from 'react';

export const Item = (props) => {

  const [pageView, setPageView] = useState(false)
  const [items, setItemData ] = useState({})

  function handleClick() {
    setPageView(!pageView)
    fetchItems()
  }
  
  if (pageView === false){
    return (<>
    <button onClick = {handleClick}>{props.item.name}</button>
  </>)
  }
  else if (pageView === true){
    return (<>
    <button onClick = {handleClick}>Show All Items</button>
    <h3>{props.item.name}</h3>
    <h4>{props.item.price}</h4>
    <h4>{props.item.category}</h4>
    <h5>{props.item.description}</h5>
    <img src={props.item.image} alt={props.item.name} />
    </>)
  }
  
  
  
  async function fetchItems () {
    try {
      const response = await fetch(`${apiURL}/:id`)
      const itemData = await response.json()
      console.log(itemData)
      setItemData(itemData)
    } catch (err) {
      console.log('Oh no an error! ', err)
    }
  }
} 
	