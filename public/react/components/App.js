import React, { useState, useEffect } from 'react';
import { ItemsList } from './ItemsList'
import { SaucesList } from './SaucesList';
import Form from './form';
// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [items, setItems] = useState([]);
	const [data, setData] = useState([]);
	async function fetchItems(){
		try {
			const response = await fetch(`${apiURL}/items`);
			const itemData = await response.json();
			
			setItems(itemData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchItems();
	}, [data]);

	return (
		<main>	
      <h1>Item Store</h1>
			<h2>All things 🔥</h2>
			<ItemsList items={items} />
			<Form data={data} setData={setData}/>
		
		</main>
	)
}