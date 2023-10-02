const router = require("express").Router(),
    { create, find, update, destroy, teachersubject} = require("../Controllers/Subject");

router
    .get("/find", find)
    .post("/create", create)
    .post("/update/:id", update)
    .post("/destroy/:id", destroy)
    .post("/teachersubject", teachersubject)

module.exports = router;