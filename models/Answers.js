const mongoose = require("mongoose"),
    UserSchema = new mongoose.Schema({
        id: 43243,
        givenAns: {
            type: Array,
            unique: false
        }
    });

module.exports = mongoose.model("Answers", UserSchema);
