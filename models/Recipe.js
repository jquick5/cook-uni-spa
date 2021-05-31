const mongoose = require('mongoose');
const moment = require('moment');

const RecipeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  firstName: {
    type: mongoose.Schema.Types.String,
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
    type: Object,
    default: moment().format('MMM Do YYYY'),
  },
});

module.exports = mongoose.model('recipe', RecipeSchema);
