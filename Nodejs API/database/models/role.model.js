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
        required: [true, "name of the role is required"]
    },
    is_active: {
        type: String,
        enum: [true, false],
        default: true
    }
}, {
    timestamps: true,
});
module.exports = mongoose.model("Role", Role)
