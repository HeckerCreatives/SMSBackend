const Quarter = require("../Models/Quarter")

exports.create = (req, res) => {
    Quarter.create(req.body)
    .then(item => res.json({message: "success", data: item}))
    .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))
}

exports.find = (req, res) => {
    Quarter.findOne()
    .sort({'createdAt': -1})    
    .then(items => {
        res.json({ message: "success", data: items})
    })
    .catch(error => res.status(400).json({ message: "bad-request", data: error.message}))
}
