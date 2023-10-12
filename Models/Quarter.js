const mongoose = require("mongoose")

const quarterSchema = new mongoose.Schema(
    {
        quarter: {
            type: String,
        },
        year: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

const Quarter = mongoose.model("Quarter", quarterSchema)
module.exports = Quarter;