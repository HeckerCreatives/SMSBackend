const mongoose = require("mongoose")

const yearandsectionSchema = new mongoose.Schema(
    {
        year: {
            type: Number,
        },
        section: {
            type: String,
        },
        deletedAt: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)

const YearAndSection = mongoose.model("YearAndSection", yearandsectionSchema)
module.exports = YearAndSection;