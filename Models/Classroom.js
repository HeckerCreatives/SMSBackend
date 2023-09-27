const mongoose = require("mongoose")

const ClassroomSchema = new mongoose.Schema(
    {
        adviser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher"
        },
        subject: {
            type: [mongoose.Schema.Types.ObjectId],
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

const Classroom = mongoose.model("Classroom", ClassroomSchema)
module.exports = Classroom;