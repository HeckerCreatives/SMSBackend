const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Roles = mongoose.model("Roles", roleSchema);

module.exports = Roles;
