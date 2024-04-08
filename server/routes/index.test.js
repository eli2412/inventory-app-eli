const Item = require("../models/index");
const app = require("../app");
const { expect } = require('@jest/globals');
const request = require('supertest')


describe("GET /items", ()=> {
   test('should return all items', async ()=> {
    const response = await request(app).get('/api/items')

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

  })
})