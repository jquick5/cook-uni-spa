const express = require('express');
const router = express.Router();

//@route    GET api/recipes
// @desc    Get all recipes
// @access  Private
router.get('/', (req, res) => {
  res.send('Get all recipes');
});

//@route    POST api/recipes
// @desc    Add new recipe
// @access  Private
router.post('/', (req, res) => {
  res.send('Add recipe');
});

//@route    PUT api/recipes/:id
// @desc    Add new recipe
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Update recipe');
});

//@route    DELETE api/recipes/:id
// @desc    Delete recipe
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete recipe');
});

module.exports = router;
