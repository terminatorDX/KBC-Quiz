const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;
const UserSessionSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model("UserSession", UserSessionSchema);
