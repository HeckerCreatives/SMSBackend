const router = require("express").Router(),
    { create, find, update, findstudent} = require("../Controllers/Student");

router
    .get("/find", find)
    .post("/create", create)
    .post("/findstudent", findstudent)
    .post("/update/:id", update)

module.exports = router;