const Quarter = require("../Models/Quarter")

exports.create = (req, res) => {

    const data = {
        _id: "651289a86c76aadd0086ddc6",
        year: 2023,
        quarter: "Quarter 1"
    }

    Quarter.create(data)
    .then(item => res.json({message: "success", data: item}))
    .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))
}

exports.update = (req, res) => {
    const {quarter, year} = req.body
    id="651289a86c76aadd0086ddc6"
    Quarter.findByIdAndUpdate(id, {year: year, quarter: quarter}, {new: true})
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

