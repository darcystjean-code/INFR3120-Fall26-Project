var express = require('express');
var router = express.Router();
var Activity = require('../models/activity');
var User = require('../models/user');

// gets activities from database and presents them on the home page
router.get('/', async function(req, res, next) {
  try {
    var activities = await Activity.find({}).sort({ date: 1, startTime: 1 });
    res.render('index', { title: 'Activity Board', activities: activities });
  } catch (error) {
    next(error);
  }
});

// loads new activity page
router.get('/activities/new', function(req, res) {
  res.render('activity-form');
});

// takes data from new activity page and adds it to the activities database
router.post('/activities', async function(req, res, next) {
  try {
    var activity = new Activity({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      startTime: req.body.startTime,
      duration: req.body.duration,
      location: req.body.location,
      setting: req.body.setting
    });
    await activity.save();
    res.redirect(303, '/');
  } catch (error) {
    next(error);
  }
}); 

// loads new user page
router.get('/users/new', function(req, res) {
  res.render('new-user');
});

// loads user login page
router.get('/users/login', function(req, res) {
  res.render('login');

});

// takes data from new user page and adds it to the users database
router.post('/users/signup', async function(req, res, next) {
  try {
    var user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    await user.save();
    res.redirect(303, '/');
  } catch (error) {
    next(error);
  }
}); 

// takes in data from login page, checks if it exists in the database, and if it exists, adds it to the users browser as a cookie
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

