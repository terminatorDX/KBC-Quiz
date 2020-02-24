const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;
UserSchema = new mongoose.Schema({
    givenAns: {
        type: Array,
        unique: false
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("Answers", UserSchema);
