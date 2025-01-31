const express = require("express");
const router = express.Router();
const { Item } = require("../models");
const authenticate = require("../middleware/auth");

// GET /item
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
      const items = await Item.findByPk(req.params.id);
      if (!items) {
          throw new Error("No show found")
      }
      res.json(items)
  } catch (error) {
      next(error)
  }
})

// CREATE /item
router.post('/', async (req, res,next) => {
 try { 
  const { name, price, description, category, image } = req.body;
  const items = await Item.create({ name, price, description, category, image });
  res.json(items);
 } catch(error){
  next(error)
 }
});

// DELETE /item
router.delete('/:id', async (req, res) => {
  const items = await Item.findByPk(req.params.id);
  if (!items) {
    return res.status(404).send('Item not found');
  }
  await items.destroy();
  res.send('Item deleted');
});


// UPDATE /item
router.put('/:id', async (req, res) => {
  const items = await Item.findByPk(req.params.id);
  if (!items) {
    return res.status(404).send('Item not found');
  }
  items.name = req.body.name;
  items.price = req.body.price;
  items.description = req.body.description;
  items.category = req.body.category;
  items.image = req.body.image;
  await items.save();
  res.send(items);
});

router.post("/", authenticate, async (req, res, next) => {
  try {
    const { name, price, description, category, image } = req.body;
    const items = await Item.create({ name, price, description, category, image });
    res.json(items);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
