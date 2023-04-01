const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email:{ type: String, required: true},
    password: { type: String, required: true},
    userName: {type: String, required: true},
    role: {type: String, required: true, default: "user"}
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel