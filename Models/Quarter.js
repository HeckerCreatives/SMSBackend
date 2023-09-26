const mongoose = require("mongoose")

const quarterSchema = new mongoose.Schema(
    {
        quarter: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)

const Quarter = mongoose.model("Quarter", quarterSchema)
module.exports = Quarter;