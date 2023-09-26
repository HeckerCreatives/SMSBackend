const mongoose = require("mongoose")

const subjectSchema = new mongoose.Schema(
    {
        subjectname: {
            type: String,
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject"
        },
        yearandsection: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "YearAndSection"
        },
    },
    {
        timestamps: true
    }
)

const Subject = mongoose.model("Subject", subjectSchema)
module.exports = Subject;