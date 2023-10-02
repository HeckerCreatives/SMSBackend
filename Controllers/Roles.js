const Roles = require("../Models/Roles")

exports.create = (req, res) => {
    const roles = [
        {
            _id: "629a98a5a881575c013b5325",
            role: "admin"
        },
        {
            _id: "629a98a5a881575c013b5326",
            role: "teacher"
        },
        {
            _id: "629a98a5a881575c013b5327",
            role: "student"
        },
    ]
    roles.map(role => {
        Roles.create(role)
    })

    res.json("Roles created.")
}