const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clothesSchema = new Schema({
    color: {
        type: String,
    },
    size: {
        type: String,
    },
    name: {
        type:String,
    },
    price: {
        type: Number,
    },
    type: {
        type: String,
    },
    ownerId:{
        type: String,
        required: [true, "Owner Id is required"],
    }
});


module.exports = mongoose.model("Clothes", clothesSchema);

export {};