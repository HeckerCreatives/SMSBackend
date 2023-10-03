const mongoose = require("mongoose")

const gradeSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject"
        },
        grade: {
            type: Number,
        },
        quarter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quarter"
        },
    },
    {
        timestamps: true
    }
)

const Grade = mongoose.model("Grade", gradeSchema)
module.exports = Grade;