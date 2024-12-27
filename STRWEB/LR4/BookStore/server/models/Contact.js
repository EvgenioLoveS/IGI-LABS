const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  phone: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: false
  },
  companyName: { // Название компании
    type: String,
    required: true
  },
  description: { // Краткое описание компании
    type: String,
    required: true
  },
  address: { // Адрес компании
    type: String,
    required: true
  },
  socialMedia: { // Ссылки на соцсети
    facebook: { type: String, required: false },
    twitter: { type: String, required: false },
    instagram: { type: String, required: false },
    linkedin: { type: String, required: false },
  },
  workingHours: { // Часы работы
    monday: { type: String, required: false },
    tuesday: { type: String, required: false },
    wednesday: { type: String, required: false },
    thursday: { type: String, required: false },
    friday: { type: String, required: false },
    saturday: { type: String, required: false },
    sunday: { type: String, required: false },
  },
  coordinates: { // Координаты для карты
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;