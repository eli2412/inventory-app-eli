import React, { useState, useEffect } from 'react';
import { ItemsList } from './ItemsList';
import Form from './form';
import Login from './Login';
import SignUp from './SignUp';
import apiURL from '../api';

export const App = () => {
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [selItem, setSelItem] = useState(null);
  const [auth, setAuth] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleAuth = () => setShowSignUp(!showSignUp); // Toggle between Login and SignUp
  // Fetch items from the API
  async function fetchItems() {
    try {
      const response = await fetch(`${apiURL}/items`);
      const itemData = await response.json();
      setItems(itemData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  // Fetch a specific item by slug
  async function clickHandler(slug) {
    try {
      const res = await fetch(`${apiURL}/items/${slug}`);
      const data = await res.json();
      setSelItem(data);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  // Delete an item by slug
  async function onDelete(slug) {
    try {
      await fetch(`${apiURL}/items/${slug}`, { method: "DELETE" });
    } catch (error) {
      console.log("Cannot delete", error);
    }
  }

  useEffect(() => {
    if (auth) fetchItems(); // Only fetch items if the user is authenticated
  }, [auth, data]);

  const handleItemClick = (slug) => clickHandler(slug);
  const handleBack = () => setSelItem(null);
  const deleteItem = async (item) => {
    await onDelete(item.id);
  };

  return (
    <main>
      <h1>Item Store</h1>
      <h2>All things 🔥</h2>
      {auth ? (
        selItem ? (
          <div className="item-detail">
            <h3>Name: {selItem.name}</h3>
            <h4>Price: {selItem.price}</h4>
            <h4>Category: {selItem.category}</h4>
            <h5>Description: {selItem.description}</h5>
            <img src={selItem.image} alt={selItem.name} />
            <button onClick={handleBack}>Back to Item Shop</button>
            <button onClick={() => deleteItem(selItem)}>Delete Item</button>
          </div>
        ) : (
          <>
            <ItemsList items={items} onTitleClick={handleItemClick} />
            <Form data={data} setData={setData} />
          </>
        )
      ) : showSignUp ? (
        <SignUp toggleAuth={toggleAuth} />
      ) : (
        <Login setAuth={setAuth} toggleAuth={toggleAuth} />
      )}
    </main>
  );
};
