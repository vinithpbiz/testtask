const mongoose = require("mongoose"),
Schema = mongoose.Schema

const Role = new Schema({
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    name: {
        type: String,
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
    updated_at:{
        type: Date,
        default: Date.now,
        required: [true, "updated_at is required"]
    }
}, {
    timestamps: true,
});
module.exports = mongoose.model("Role", Role)
