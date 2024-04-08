const express = require("express");
const router = express.Router();
const { Item } = require("../models");

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

module.exports = router;
