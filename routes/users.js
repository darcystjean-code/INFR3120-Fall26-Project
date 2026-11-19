var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get('/users/new', function(req, res) {
  res.render('new-user');
});

router.get('/users/login', function(req, res) {
  res.render('login');

});

router.post('/users/signup', async function(req, res, next) {
  try {
    var user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.mody.password
    });
    await user.save();
    res.redirect(303, '/');
  } catch (error) {
    next(error);
  }
}); 

router.post('/users/login', async function(req, res, next) {
  try {
    var user = await User.findOne({ email: req.body.email, password: req.body.password });
    res.cookie(user.email, user.name);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;