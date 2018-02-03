const mongoose = require('mongoose');
const validator = require('validator');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: {
            isAsync: false,
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;