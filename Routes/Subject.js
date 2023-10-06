const router = require("express").Router(),
    { create, find, update, destroy, teachersubject, findstudent, findsubject} = require("../Controllers/Subject");

router
    .get("/find", find)
    .post("/create", create)
    .post("/update/:id", update)
    .post("/destroy/:id", destroy)
    .post("/teachersubject", teachersubject)
    .post("/findstudent", findstudent)
    .post("/findsubject", findsubject)
module.exports = router;