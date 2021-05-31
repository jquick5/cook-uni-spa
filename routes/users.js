const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');

//@route    PUT api/recipes/:id
// @desc    Update Recipe
// @access  Private
router.put('/:id', async (req, res) => {
  const { userName, firstName, lastName, email, password, likedRecipes } =
    req.body;

  //Build contact object
  const userFields = {};
  if (userName) userFields.userName = userName;
  if (firstName) userFields.firstName = firstName;
  if (lastName) userFields.lastName = lastName;
  if (email) userFields.email = email;
  if (password) userFields.password = password;
  if (likedRecipes) userFields.likedRecipes = likedRecipes;

  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    //Make sure user cannot update anyone elses info
    // if (user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: 'Not authorized' });
    // }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true },
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error...');
  }
});

//@route POST api/users
// @desc Resister a user
// @access Public
router.post(
  '/',
  [
    check('firstName', 'Please add your first name').not().isEmpty(),
    check('lastName', 'Please add your last name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters',
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userName, firstName, lastName, email, password, likedRecipes } =
      req.body;

    try {
      let username = await User.findOne({ userName });
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      if (username) {
        return res.status(400).json({
          msg: 'Username already exists, please enter a different username',
        });
      }

      user = new User({
        userName,
        firstName,
        lastName,
        email,
        password,
        likedRecipes,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
