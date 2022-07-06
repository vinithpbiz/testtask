const mongoose = require("mongoose"),
Schema = mongoose.Schema

const User = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    first_name: {
        type: String,
        required: [true, "first_name is required"]
    },
    last_name: {
        type: String,
        required: [true, "last_name is required"]
    },
    role_id: {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required: [true, "role_id is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    is_active: {
        type: String,
        enum: [true, false],
        default: true
    },
    created_at: {
        type : Date,
        default: Date.now,
        required: [true, "created_at is required"] 
    },
    updated_at: {
        type: Date,
        default: Date.now,
        required: [true, "updated_at is required"]
    }
}, {
    timestamps: true,
});
module.exports = mongoose.model("User", User)
