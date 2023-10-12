const Login = require("../Models/Login")
const Student = require("../Models/Student")
const Teacher = require("../Models/Teacher")

exports.login = (req, res) => {
    const {username, password} = req.body;
    Login.findOne({username: username})
    .then(data => {
        if(data.password !== password){
            return res.json({message: "failed", data: "Incorrect Password"})
        } else {
            Student.findOne({userdetails: data._id})
            .populate({
                path: "yearandsection role"
            })
            .then(student => {
                if(student !== null) {
                    res.json({message: "success", data: student})
                } else {
                    Teacher.findOne({userdetail: data._id})
                    .populate({
                        path: "role"
                    })
                    .then(teacher => {
                        if(teacher.ban){
                            res.json({message:"ban", data: "You Are Ban"})
                        } else {
                            res.json({message: "success", data: teacher})
                        }
                    })
                    .catch(error => res.status(400).json({ message: "bad-request", data: error.message }));
                }
            })
            .catch(error => res.status(400).json({ message: "bad-request", data: error.message }));
        }   
    })
    .catch(error => res.status(400).json({ message: "bad-request", data: error.message }));
}