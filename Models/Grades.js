const mongoose = require("mongoose")

const gradeSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher"
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject"
        },
        grade: {
            type: String,
        },
        Quarter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject"
        },
    },
    {
        timestamps: true
    }
)

const Grade = mongoose.model("Grade", gradeSchema)
module.exports = Grade;