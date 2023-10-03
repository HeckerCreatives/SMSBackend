const router = require("express").Router(),
    { create, update, findstudent, find, findone} = require("../Controllers/Grades");

router
    .post("/update/:id", update)
    .post("/create", create)
    .post("/findstudent", findstudent)
    .post("/find", find)
    .post("/findone", findone)

module.exports = router;