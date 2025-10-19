const express = require("express");
const router = express.Router();
const Food = require("../models/foodModel");

// Get all food items
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
