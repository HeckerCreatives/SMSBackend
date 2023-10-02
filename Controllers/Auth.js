const Login = require("../Models/Login")

exports.login = (req, res) => {
    const {username, password} = req.body;
    Login.findOne({username: username})
    .then(data => {
        if(data.password !== password){
            return res.json({message: "failed", data: "Incorrect Password"})
        } else {
            
        }
    })
}