const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

// Получить все категории
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;