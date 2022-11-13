const express = require('express');
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user');
const passport = require('passport');


router.get('/register', (req, res) => {
  res.render('users/register')
})

router.post('/register', catchAsync(async (req, res) => {
  try {
  const {username, email, password} = req.body;
  const user = new User({username, email});
  const registeredUser = await User.register(user, password);
  req.flash('success', 'Welcome to yelpCamp!')
  res.redirect('/campgrounds')
  } catch (e) {
    req.flash('error', e.message)
    res.redirect('/register')
  }
}))

router.get('/login', (req, res) => {
  res.render('users/login')
})

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}) , (req, res) => {
  req.flash('success', 'Welcome back again!');
  res.redirect('/campgrounds')
})

router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Goodbye!');
    res.redirect('/login');
  });
})

module.exports = router