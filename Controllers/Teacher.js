const Teacher = require("../Models/Teacher")
const Login = require("../Models/Login")
const Subject = require("../Models/Subject")
const Student = require("../Models/Student")
const Grade = require("../Models/Grades")
const Quarter = require("../Models/Quarter")
const Classroom = require("../Models/Classroom")
exports.createadmin = (req, res) => {

    const adminlogin = {
        _id: "629a98a5a881575c013b5324",
        username: "superadmin",
        password: "dev123"
    }

    Login.create(adminlogin)
    .then(() => {
        const admin = {
            firstname: "Admin",
            middlename: "admin",
            lastname: "admin",
            contact: "1234567890",
            address: "admin",
            role: "629a98a5a881575c013b5325",
            userdetail: "629a98a5a881575c013b5324"
        }
    
        Teacher.create(admin)
        .then(() => res.json("Admin Created"))
        .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))
    })

}

exports.create = async (req, res) => {
    const {username, password, firstname, middlename, lastname, contact, address,} = req.body;
    const Ldetail = {
        username: username,
        password: password
    }
    await Login.findOne({username: username})
    .then(async user => {
        if(user){
            return res.json({message: "failed", data: "Username is already taken"})
        }

       await Teacher.findOne({ firstname: firstname, middlename: middlename, lastname: lastname })
        .then(item => {
            if(item){
                return res.json({message: "failed", data: "Users Full Name Already exist"})
            }

            Login.create(Ldetail)
            .then(data => {
    
                if(data){
                    
                    const Tdata = {
                        firstname: firstname,
                        middlename: middlename,
                        lastname: lastname,
                        contact: contact,
                        address: address,
                        role: "629a98a5a881575c013b5326",
                        userdetail: data._id
                    }
    
                    Teacher.create(Tdata)
                    .then(item => res.json({message: "success", data: item}))
                    .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))
                }
                
            })
            .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))

        })

       
        
    })
    .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))
    
}

exports.update = (req, res) => {
    const { loginid, password } = req.body
    Teacher.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(item => {
        if(password){
            Login.findByIdAndUpdate(loginid, {password: password}, {new: true})
            .then(user => {
                res.json({message: "success", data: item, user: user})
            })
            .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))
        } else {
            res.json({message: "success", data: item})
        }
        
    })
    .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))
}

exports.find = (req, res) => {
    const pageOptions = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10
    }
    Teacher.find()
    .populate({
        path: "userdetail"
    })
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .sort({'createdAt': -1})    
    .then(items => {
        Teacher.countDocuments()
        .then(count => {
            const totalPages = Math.ceil(count / 10)
            res.json({ message: "success", data: items.filter(e => !e.ban), pages: totalPages })
        })
        .catch(error => res.status(400).json({ message: "bad-request", data: error.message}))
    })
    .catch(error => res.status(400).json({ message: "bad-request", data: error.message}))
}

exports.ban = (req, res) => {
    Teacher.find({_id: req.params.id})
    .then(data => {
        if(!data[0].ban){
            Teacher.findByIdAndDelete(req.params.id)
            .then((data) => {
                Login.findOneAndDelete({_id: data.userdetail})
                .then(() => {
                    Classroom.findOne({adviser: req.params.id})
                    .then(item => {
                        if(item){
                            Classroom.findByIdAndDelete(item._id)
                            .then(() => {
                                res.json({message: "success"})
                            })
                            .catch(error => res.status(400).json({ message: "bad-request", data: error.message }))
                        } else {
                            res.json({message: "success"})
                        }
                    })
                    .catch(error => res.status(400).json({ message: "bad-request", data: error.message }))
                })
                .catch(error => res.status(400).json({ message: "bad-request", data: error.message }))
            })
            .catch(error => res.status(400).json({ message: "bad-request", data: error.message }))
        } else {
            res.json({message: "failed", data: "this user is already ban"})
        }
    })
    .catch(error => res.status(400).json({ message: "bad-request", data: error.message }))
}

// exports.unban = (req, res) => {
//     // const banData = {
//     //     ban: false
//     // }
//     Teacher.find({_id: req.params.id})
//     .then(data => {
//         if(data[0].ban){
//             Teacher.findByIdAndDelete(req.params.id)
//             .then(() => {
//                 res.json({message: "success"})
//             })
//             .catch(error => res.status(400).json({ message: "bad-request", data: error.message }))
//         } else {
//             res.json({message: "failed", data: "this user is already unban"})
//         }
//     })
//     .catch(error => res.status(400).json({ message: "bad-request", data: error.message }))
// }

exports.findstudent = (req, res) => {
    const { studentid } = req.body
    const pageOptions = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10
    }
    // const currentDate = new Date();
    // const currentYear = currentDate.getFullYear();
    // const quartersToFind = [
    //     `${currentYear} Quarter 1`,
    //     `${currentYear} Quarter 2`,
    //     `${currentYear} Quarter 3`,
    //     `${currentYear} Quarter 4`,
    // ];
    Quarter.findOne({
    // $or: quartersToFind.map((quarter) => ({ $quarter: quarter })),
    })
    .then((items) => {
        // const itemArray = items.map((item) => item._id); // This will contain an array of _id values
    Grade.find({ student: studentid, $or:[{"quarter":{"$in":items._id}}]})
    .populate([
    {path: "student"},
    {path: "subject"},
    {path: "quarter"},
    ])
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .sort({'createdAt': 1})    
    .then(items => {
        Grade.countDocuments({ student: studentid, $or:[{"quarter":{"$in":items._id}}]})
        .then(count => {
            const totalPages = Math.ceil(count / 10)
            res.json({ message: "success", data: items.filter(e => !e.deletedAt), pages: totalPages })
        })
        .catch(error => res.status(400).json({ message: "bad-request", data: error.message}))
    })
    .catch(error => res.status(400).json({ message: "bad-request", data: error.message}))
    })
}