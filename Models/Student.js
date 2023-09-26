const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema(
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
        father: {
            type: String,
        },
        mother: {
            type: String,
        },
        yearandsection: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "YearAndSection"
        },
        userdetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Login"
        },
    },
    {
        timestamps: true
    }
)

const Student = mongoose.model("Student", StudentSchema)
module.exports = Student;