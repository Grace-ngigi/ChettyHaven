const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});
const petcareSchema = new Schema({
    petType: String,
    breed: String,
    age: Number,
    petName: String,
    need: String,

    images:[ImageSchema],
    status: {
        type: String,
        default: null,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Petcare', petcareSchema);