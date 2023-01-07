const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const { roles } = require('../utilities/contants');
const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    location: String,
    fname: String,
    phone: Number,
    adopt: {
        type: Schema.Types.ObjectId,
        ref: 'Adopt'
    },
    role: {
        type: String,
        enum: [roles.admin, roles.user],
        default: roles.user
    }
});
UserSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            if (this.username === process.env.ADMIN_USERNAME.toLowerCase()) {
                this.role = roles.admin;
                console.log(this.role)
            }
        }
        next()
    } catch (error) {
        next(error)
    }
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);