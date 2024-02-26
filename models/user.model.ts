const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    userType : {
        type: String,
        enum: ["user", "admin", "retailer"],
        default: "user",
    }
});


module.exports = mongoose.model("User", userSchema);

export {};