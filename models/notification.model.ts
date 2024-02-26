const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    ownerId: {
        type: String,
        required: [true, "User Id is required"],
    },
    message: {
        type: String,
        required: [true, "Message is required"],
    },
    read: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Notification", notificationSchema);