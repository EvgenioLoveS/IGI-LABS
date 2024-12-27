const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'Название категории должно быть минимум из 3 символов'],
  },
  description: {
    type: String,
    required: true,
    minlength: [10, 'Описание категории должно содержать минимум 10 символов'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);
