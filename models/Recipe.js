const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  meal: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  prepMethod: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  foodImageURL: {
    type: String,
  },
  categoryImageURL: {
    type: String,
  },
  likesCounter: {
    type: Number,
    default: 0,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('recipe', RecipeSchema);
