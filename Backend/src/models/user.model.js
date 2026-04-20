const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is already taken"],
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: [true, "account already created with this email id"],
    },
    password:{
        type: String,
        required: [true, "password is required"]
    }
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;