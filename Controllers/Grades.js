const Grade = require("../Models/Grades")
const Quarter = require("../Models/Quarter")
const Subject = require("../Models/Subject")
const Student = require("../Models/Student")

exports.create = (req, res) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const quartersToFind = [
        `${currentYear} Quarter 1`,
        `${currentYear} Quarter 2`,
        `${currentYear} Quarter 3`,
        `${currentYear} Quarter 4`,
      ];
    Grade.create(req.body)
    .then(item => res.json({message: "success", data: item}))
    .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))
}

exports.update = (req, res) => {
    const {grade} = req.body
    Grade.findByIdAndUpdate(req.params.id, {grade: grade}, {new: true})
    .then(item => res.json({message: "success", data: item}))
    .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))
}

exports.find = (req, res) => {
    const { id } = req.body
    const pageOptions = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10
    }
    Grade.find({student: id})
    .populate([
    {path: "student"},
    {path: "subject"},
    {path: "quarter"},
    ])
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .sort({'createdAt': -1})    
    .then(items => {
        Grade.countDocuments({student: id})
        .then(count => {
            const totalPages = Math.ceil(count / 10)
            res.json({ message: "success", data: items.filter(e => !e.deletedAt), pages: totalPages })
        })
        .catch(error => res.status(400).json({ message: "bad-request", data: error.message}))
    })
    .catch(error => res.status(400).json({ message: "bad-request", data: error.message}))
}

exports.findstudent = (req, res) => {
    const { id } = req.body;
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
                                subject: subject,
                                student: matchingStudent,
                                quarter: quarter
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
    })
    .catch(error => res.status(400).json({ message: "bad-request", data: error.message }));
}

exports.findone = (req, res) => {
    const { subjectid, studentid } = req.body
    const pageOptions = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10
    }
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const quartersToFind = [
        `${currentYear} Quarter 1`,
        `${currentYear} Quarter 2`,
        `${currentYear} Quarter 3`,
        `${currentYear} Quarter 4`,
      ];
    Quarter.find({
    $or: quartersToFind.map((quarter) => ({ $quarter: quarter })),
    })
    .then((items) => {
        const itemArray = items.map((item) => item._id); // This will contain an array of _id values
    Grade.find({subject: subjectid, student: studentid, $or:[{"quarter":{"$in":itemArray}}]})
    .populate([
    {path: "student"},
    {path: "subject"},
    {path: "quarter"},
    ])
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .sort({'createdAt': 1})    
    .then(items => {
        Grade.countDocuments({subject: subjectid, student: studentid, $or:[{"quarter":{"$in":itemArray}}]})
        .then(count => {
            const totalPages = Math.ceil(count / 10)
            res.json({ message: "success", data: items.filter(e => !e.deletedAt), pages: totalPages })
        })
        .catch(error => res.status(400).json({ message: "bad-request", data: error.message}))
    })
    .catch(error => res.status(400).json({ message: "bad-request", data: error.message}))
    })
    
}