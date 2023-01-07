const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    fname: String,
    email: String,
    feedback: String
});

module.exports = mongoose.model('Feedback', FeedbackSchema);