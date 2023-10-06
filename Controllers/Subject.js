const Subject = require("../Models/Subject")
const Student = require("../Models/Student")
exports.create = (req, res) => {
    Subject.create(req.body)
    .then(item => res.json({message: "success", data: item}))
    .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))
}

exports.update = (req, res) => {
    Subject.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(item => res.json({message: "success", data: item}))
    .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))
}

exports.find = (req, res) => {
    const pageOptions = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10
    }
    Subject.find()
    .populate([
    {path: "yearandsection"},
    {path: "teacher"}
    ])
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .sort({'createdAt': -1})    
    .then(items => {
        Subject.countDocuments()
        .then(count => {
            const totalPages = Math.ceil(count / 10)
            res.json({ message: "success", data: items.filter(e => !e.deletedAt), pages: totalPages })
        })
        .catch(error => res.status(400).json({ message: "bad-request", data: error.message}))
    })
    .catch(error => res.status(400).json({ message: "bad-request", data: error.message}))
}

exports.findsubject = (req, res) => {
    const { id } = req.body
    const pageOptions = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10
    }
    Subject.find({yearandsection: id})
    .populate([
    {path: "yearandsection"},
    {path: "teacher"}
    ])
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .sort({'createdAt': -1})    
    .then(items => {
        Subject.countDocuments({yearandsection: id})
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
    Subject.find({_id: req.params.id})
    .then(data => {
        if(!data[0].deletedAt){
            Subject.findByIdAndUpdate(req.params.id, banData)
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

exports.teachersubject = (req,res) => {
    const { id } = req.body

    Subject.find({teacher: id})
    .populate([
        {path: "yearandsection"},
        {path: "teacher"}
    ])
    .sort({'createdAt': -1})
    .then(data => {
        res.json({message: "success", data: data.filter(e => !e.deletedAt)})
    })
    .catch(error => res.status(400).json({ message: "bad-request", data: error.message }))
}

exports.findstudent = (req, res) => {
    const { id } = req.body;

    Subject.find({ teacher: id })
        .populate([
            { path: "yearandsection" },
        ])
        .sort({ 'createdAt': -1 })
        .then(subjects => {
            if (subjects && subjects.length > 0) {
                const yearAndSectionIds = subjects.map(subject => subject.yearandsection._id);

                Student.find({ yearandsection: { $in: yearAndSectionIds } })
                    .populate([
                        { path: "userdetails" },
                        { path: "yearandsection" }
                    ])
                    .sort({ 'createdAt': -1 })
                    .then(students => {
                        // Create an array to store the combined data
                        const combinedData = subjects.map(subject => {
                            const matchingStudents = students.filter(student => String(student.yearandsection._id) === String(subject.yearandsection._id));
                            const studentData = matchingStudents.map(matchingStudent => ({
                                subjectName: subject.subjectname,
                                student: matchingStudent,
                            }));
                            return studentData.length > 0 ? studentData : null; // If no matching students are found, set to null
                        }).flat();

                        res.json({ message: "success", data: combinedData });
                    })
                    .catch(error => res.status(400).json({ message: "bad-request", data: error.message }));
            } else {
                res.json({ message: "failed", data: "teacher has no advisory class" });
            }
        })
        .catch(error => res.status(400).json({ message: "bad-request", data: error.message }));
}

