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
        quarter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quarter"
        },
        writtenworks: [{
            type: Number
        }],
        writtenworksHighestTotal: [{
            type: Number
        }],
        writtenworksTotal: {
            type: Number
        },
        writtenworksPS: {
            type: Number
        },
        writtenworksWS: {
            type: Number
        },
        performancetask: [{
            type: Number
        }],
        performancetaskHighestTotal: [{
            type: Number
        }],
        performancetaskTotal: {
            type: Number
        },
        performancetaskPS: {
            type: Number
        },
        performancetaskWS: {
            type: Number
        },
        quarterlyassessment: {
            type: Number
        },
        quarterlyassessmentHighestTotal: {
            type: Number
        },
        quarterlyassessmentPS: {
            type: Number
        },
        quarterlyassessmentWS: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

const Grade = mongoose.model("Grade", gradeSchema)
module.exports = Grade;