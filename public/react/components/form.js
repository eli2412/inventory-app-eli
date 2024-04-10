import React, { useState } from "react";
import apiURL from '../api';

function Form() {
    const [name, setName]=useState("");
    const [price, setPrice]=useState("");
    const [description, setDescription]=useState("");
    const [category, setCategory]=useState("");
    const [image, setImage]=useState("");

    async function submitForm(e){

        e.preventDefault();
        
        const newItemForm= {
            name: name,
            price: price,
            description: description,
            category: category,
            image: image
        }
        await fetch(`${apiURL}/items`, {
            method: "POST",
            headers: {"Content-type":
        "application/json"},
        body: JSON.stringify(newItemForm)
        })

        await fetch(`${apiURL}/items`, {
          method: "PUT",
          headers: {"Content-type":
        "application/json"},
        body: JSON.stringify(newItemForm)
      })

        setName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setImage("");
    }
    return (
    <>
        <form onSubmit={submitForm}>
        <label>
          Name of Item:
          <input value= {name} onChange={(e) => setName(e.target.value)} placeholder="Name"/>
        </label>

        <label>
          Price:
          <input type="number" onChange={(e) => setPrice(e.target.value)} placeholder="Price"/>
        </label>
        <label>
          Description: <input value= {description} onChange={(e) => setDescription(e.target.value)} placeholder="description of item" />
        </label>
        <label>
          Category: <input value ={ category} onChange={(e) => setCategory(e.target.value)}placeholder="category of item" />
        </label>
            
        <label>
          Image: <input value = {image} onChange={(e) => setImage(e.target.value)} placeholder="image of itrms" />
        </label>
        <button type="submit">Submit form</button>
         </form>
        </>
    )
    };
export default Form;