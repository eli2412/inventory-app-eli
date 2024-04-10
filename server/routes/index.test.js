const {Item} = require("../models/index");
const app = require("../app");
const { expect } = require('@jest/globals');
const request = require('supertest')


describe("GET /items", ()=> {
   test('should return all items', async ()=> {
    const response = await request(app).get('/api/items')

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

  })
  it("Should create an item", async ()=>{
    const item = new Item("Tabby 24 Coach Bag", 500, "Purse", "this is a coach bad", "www.image.com")
    const response = await request(app).get('/api/items')

    expect(item).toBeInstanceOf(Item);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  })
  it('deletes an item', async()=>{
    const newItem = await Item.create({
      name:"Tabby 24 Coach Bag",
      price: 500, 
      category:"Purse", 
      description:"this is a coach bag",
      image: "https://m.media-amazon.com/images/I/51IVI1u5mFL._AC_UY1000_.jpg"
  })
      const itemId = newItem.id;

      await Item.destroy({
        where:{
          id:itemId
        }
      });

      const deletedItem = await Item.findByPk(itemId);

      expect(deletedItem).toBe(null)
  })
  it("should update an item", async()=>{
    const newItem = await Item.create({
      name:"Tabby 24 Coach Bag",
      price: 500, 
      category:"Purse", 
      description:"this is a coach bag",
      image: "https://m.media-amazon.com/images/I/51IVI1u5mFL._AC_UY1000_.jpg"
  })
  const itemId = newItem.id;
  const updatedItem = {
    name:" Coach tote Bag",
    price: 400, 
    category:"Purse", 
    description:"this is a coach bag",
    image: "https://m.media-amazon.com/images/I/51IVI1u5mFL._AC_UY1000_.jpg"
  }

 const itemToUpdate = await Item.findByPk(itemId);
 Object.assign(itemToUpdate, updatedItem)
 await itemToUpdate.save();
 const newUpdatedItem = await Item.findByPk(itemId)

 expect(newUpdatedItem.name).toEqual(updatedItem.name)
  })
})