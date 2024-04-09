import React from 'react';
import apiURL from '../api';

export const Item = ({ item, onClick}) => {
  return <>
  <div>
    <button onClick={onClick}><h3>{item.title}</h3></button>
  </div>
  </>
};