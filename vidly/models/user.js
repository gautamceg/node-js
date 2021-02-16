const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    passwrod: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
const User = mongoose.model('User', userSchema);