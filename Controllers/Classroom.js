const Classroom = require("../Models/Classroom")
const Student = require("../Models/Student")
const Quarter = require("../Models/Quarter")
const Subject = require("../Models/Subject")
exports.create = (req, res) => {
    Classroom.create(req.body)
    .then(item => res.json({message: "success", data: item}))
    .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))
}

exports.update = (req, res) => {
    Classroom.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(item => res.json({message: "success", data: item}))
    .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))
}


exports.find = (req, res) => {
    const pageOptions = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10
    }
    Classroom.find()
    .populate([
        {path: "yearandsection"},
        {path: "subject"},
        {path: "adviser"},
    ])
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .sort({'createdAt': -1})    
    .then(items => {
        Classroom.countDocuments()
        .then(count => {
            const totalPages = Math.ceil(count / 10)
            res.json({ message: "success", data: items.filter(e => !e.adviser.ban), pages: totalPages })
        })
        .catch(error => res.status(400).json({ message: "bad-request", data: error.message}))
    })
    .catch(error => res.status(400).json({ message: "bad-request", data: error.message}))
}

exports.findadvisory = (req, res) => {
    const { id } = req.body

    Classroom.findOne({adviser: id})
    .populate([
        {path: "yearandsection"},
        {path: "subject"},
        {path: "adviser"},
    ])
    .sort({'createdAt': -1})
    .then(data => {
        Quarter.findOne({})
        .then(quarter => {
        Subject.find({ teacher: id })
        .populate([
            { path: "yearandsection" },
        ])
        .sort({ 'createdAt': -1 })
        .then(subjects => {
            if (subjects && subjects.length > 0) {
                const yearAndSectionIds = subjects.map(subject => subject.yearandsection._id);

                Student.find({ yearandsection: { $in: data.yearandsection } })
                    .populate([
                        { path: "userdetails" },
                        { path: "yearandsection" }
                    ])
                    .sort({ 'createdAt': -1 })
                    .then(students => {

                        const combinedData = students.map(student => ({
                            // subject: advisoryClass.subject,
                            student: student,
                            quarter: quarter,
                        }));

                        res.json({ message: "success", data: combinedData });
                    })
                    .catch(error => res.status(400).json({ message: "bad-request", data: error.message }));
            } else {
                res.json({ message: "failed", data: "teacher has no advisory class" });
            }
        })
        .catch(error => res.status(400).json({ message: "bad-request", data: error.message }));
    })
    .catch(error => res.status(400).json({ message: "bad-request", data: error.message }));
    })
    .catch(error => res.status(400).json({ message: "bad-request", data: error.message}))
}