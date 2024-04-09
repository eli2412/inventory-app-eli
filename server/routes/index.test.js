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
})