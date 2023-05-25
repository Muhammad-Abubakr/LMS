const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        index: true,
    },
    email: {
        type: String,
        required: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);