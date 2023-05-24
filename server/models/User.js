const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
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
});

module.exports = mongoose.model('user', UserSchema);