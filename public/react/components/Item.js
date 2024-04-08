import React from 'react';

export const Item = (props) => {

  return <>
    <h3>{props.item.name}</h3>
    <h4>{props.item.price}</h4>
    <h4>{props.item.category}</h4>
    <h5>{props.item.description}</h5>
    <img src={props.item.image} alt={props.item.name} />
  </>
} 
	