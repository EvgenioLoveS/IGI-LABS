const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Получить все контакты
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();  // Извлекаем все контакты из базы данных
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;