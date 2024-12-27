const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Категория обязательна']
  },
  title: {
    type: String,
    required: true,
    minlength: [2, 'Название должно содержать минимум 2 символа'],
  },
  author: {
    type: String,
    required: true,
    minlength: [2, 'Автор должен содержать минимум 2 символа'],
  },
  genre: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Цена не может быть отрицательной'],
  },
  coverColor: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String, // URL строки для хранения пути к изображению
    // required: true,
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.models.Book || mongoose.model('Book', bookSchema);
