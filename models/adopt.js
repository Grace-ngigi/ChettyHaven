const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});
const adoptSchema = new Schema({
    nicky: String,
    petType: String,
    date: Date,
    breed: String,
    age: Number,
    color: String,
    history: String,
    condition: String,

    images:[ImageSchema],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Adopt', adoptSchema);