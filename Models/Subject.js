const mongoose = require("mongoose")

const subjectSchema = new mongoose.Schema(
    {
        subjectname: {
            type: String,
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher"
        },
        yearandsection: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "YearAndSection"
        },
        deletedAt: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)

const Subject = mongoose.model("Subject", subjectSchema)
module.exports = Subject;