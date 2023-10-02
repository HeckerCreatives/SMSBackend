const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
        },
        middlename: {
            type: String,
        },
        lastname: {
            type: String,
        },
        contact: {
            type: String,
        },
        address: {
            type: String,
        },
        ban: {
            type: Boolean,
            default: false,
        },
        userdetail: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Login"
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Roles"
        }
    },
    {
        timestamps: true
    }
)

const Teacher = mongoose.model("Teacher", teacherSchema)
module.exports = Teacher;