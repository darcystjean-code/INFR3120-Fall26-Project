const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    startTime: String,
    duration: Number,
    location: String,
    setting: String
});

module.exports = mongoose.model('Activity', activitySchema);