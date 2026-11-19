var express = require('express');
var router = express.Router();
var Activity = require('../models/activity');
var User = require('../models/user');

router.get('/', async function(req, res, next) {
  try {
    var activities = await Activity.find({}).sort({ date: 1, startTime: 1 });
    res.render('index', { title: 'Activity Board', activities: activities });
  } catch (error) {
    next(error);
  }
});


router.get('/activities/new', function(req, res) {
  res.render('activity-form');
});

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


