const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});
const rescueShema = new Schema({
    petType: String,
    location: String,
    desc: String,
    fname: String,
    phone: Number,
    status: String,

    images:[ImageSchema],
    status: {
        type: String,
        default: null,
    },
});

module.exports = mongoose.model('Rescue', rescueShema);