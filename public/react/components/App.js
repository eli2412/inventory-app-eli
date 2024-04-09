import React, { useState, useEffect } from 'react';
import { ItemsList } from './ItemsList'
import { SaucesList } from './SaucesList';
import Form from './form';
// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [items, setItems] = useState([]);
	const [data, setData] = useState([]);
	const [selItem, setSelItem] = useState(null);


	async function fetchItems(){
		try {
			const response = await fetch(`${apiURL}/items`);
			const itemData = await response.json();
			
			setItems(itemData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	async function clickHandler(slug) {
		try {
		const res = await fetch(`${apiURL}/items/${slug}`)
		const data = await res.json();
		setSelItem(data)
	  } catch (err) {
		console.log('Oh no an error! ', err)
	  }
	}

	useEffect(() => {
		fetchItems();
	}, [data]);

	function handleItemClick(slug) {
		clickHandler(slug)
	  }
	function handleBack() {
		setSelItem(null)
	  }

	return (
		<main>	
      <h1>Item Store</h1>
			<h2>All things 🔥</h2>
			{selItem ? (
				<div>
    <h3>Name: {selItem.name}</h3>
    <h4>Price: {selItem.price}</h4>
    <h4>Category: {selItem.category}</h4>
    <h5>Description: {selItem.description}</h5>
	<img src={selItem.image} alt={selItem.name} />
	<button onClick={handleBack}>Back to Item Shop</button>
						  </div>
			) : (
				<>
				<ItemsList items={items} onTitleClick={handleItemClick} />
				<Form data={data} setData={setData}/>
				</>
			)}
		</main>
	)
}