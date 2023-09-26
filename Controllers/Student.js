const Student = require("../Models/Student")
const Login = require("../Models/Login")

exports.create = (req, res) => {
    const {username, password, firstname, middlename, lastname, contact, address, yearandsection, mother, father} = req.body;
    const Ldetail = {
        username: username,
        password: password
    }
    Login.findOne({username: username})
    .then(user => {
        if(user){
            return res.json({message: "failed", data: "Username is already taken"})
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
                    mother: mother,
                    father: father,
                    yearandsection: yearandsection,
                    userdetails: data._id
                }

                Student.create(Tdata)
                .then(item => res.json({message: "success", data: item}))
                .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))
            }
            
        })
        .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))
        
    })
    .catch(err => res.status(400).json({message:"Badrequest", error: err.message }))
    
}

exports.update = (req, res) => {
    const { loginid, password } = req.body
    Student.findByIdAndUpdate(req.params.id, req.body, {new: true})
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
    Student.find()
    .populate([
        { path: "userdetails" },
        { path: "yearandsection" }
      ])
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .sort({'createdAt': -1})    
    .then(items => {
        Student.countDocuments()
        .then(count => {
            const totalPages = Math.ceil(count / 10)
            res.json({ message: "success", data: items.filter(e => !e.ban), pages: totalPages })
        })
        .catch(error => res.status(400).json({ message: "bad-request", data: error.message}))
    })
    .catch(error => res.status(400).json({ message: "bad-request", data: error.message}))
}