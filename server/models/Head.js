const mongoose = require("mongoose");
const headSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Head", headSchema);