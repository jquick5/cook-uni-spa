const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Recipe = require('../models/Recipe');
const { json } = require('express');

//@route    GET api/recipes
// @desc    Get all recipes
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.send('Server Error...');
  }
});

//@route    POST api/recipes
// @desc    Add new recipe
// @access  Private
router.post(
  '/',
  [auth, [check('meal', 'Meal name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      meal,
      ingredients,
      prepMethod,
      description,
      category,
      foodImageURL,
      categoryImageURL,
      likesCounter,
      date,
    } = req.body;

    try {
      const newRecipe = new Recipe({
        meal,
        ingredients,
        prepMethod,
        description,
        category,
        foodImageURL,
        categoryImageURL,
        likesCounter,
        date,
        user: req.user.id,
      });

      const recipe = await newRecipe.save();
      res.json(recipe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error...');
    }
  },
);

//@route    PUT api/recipes/:id
// @desc    Update Recipe
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const {
    meal,
    ingredients,
    prepMethod,
    description,
    category,
    foodImageURL,
    categoryImageURL,
    likesCounter,
    date,
  } = req.body;

  //Build contact object
  const recipeFields = {};
  if (meal) recipeFields.meal = meal;
  if (ingredients) recipeFields.ingredients = ingredients;
  if (prepMethod) recipeFields.prepMethod = prepMethod;
  if (description) recipeFields.description = description;
  if (category) recipeFields.category = category;
  if (foodImageURL) recipeFields.foodImageURL = foodImageURL;
  if (categoryImageURL) recipeFields.categoryImageURL = categoryImageURL;
  if (likesCounter) recipeFields.likesCounter = likesCounter;
  if (date) recipeFields.date = date;

  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ msg: 'Recipe not found' });

    //Make sure user cannot update anyone elses recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: recipeFields },
      { new: true },
    );

    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error...');
  }
});

//@route    DELETE api/recipes/:id
// @desc    Delete recipe
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ msg: 'Recipe not found' });

    //Make sure user cannot update anyone elses recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Recipe.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Recipe Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error...');
  }
});

module.exports = router;
