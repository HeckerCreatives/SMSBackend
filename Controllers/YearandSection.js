const YearAndSection = require("../Models/YearandSection")


exports.create = (req, res) => {
    YearAndSection.create(req.body)
    .then(item => res.json({message: "success", data: item}))
    .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))
}

exports.update = (req, res) => {
    YearAndSection.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(item => res.json({message: "success", data: item}))
    .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))
}

exports.find = (req, res) => {
    const pageOptions = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10
    }
    YearAndSection.find({})
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .sort({'createdAt': -1})    
    .then(items => {
        YearAndSection.countDocuments({})
        .then(count => {
            const totalPages = Math.ceil(count / 10)
            res.json({ message: "success", data: items.filter(e => !e.deletedAt), pages: totalPages })
        })
        .catch(error => res.status(400).json({ message: "bad-request", data: error.message}))
    })
    .catch(error => res.status(400).json({ message: "bad-request", data: error.message}))
}

exports.destroy = (req, res) => {
    const banData = {
        deletedAt: new Date().toLocaleString()
    }
    YearAndSection.find({_id: req.params.id})
    .then(data => {
        if(!data[0].deletedAt){
            YearAndSection.findByIdAndUpdate(req.params.id, banData)
            .then(() => {
                res.json({message: "success"})
            })
            .catch(error => res.status(400).json({ message: "bad-request", data: error.message }))
        } else {
            res.json({message: "failed", data: "this is already deleted"})
        }
    })
    .catch(error => res.status(400).json({ message: "bad-request", data: error.message }))
}