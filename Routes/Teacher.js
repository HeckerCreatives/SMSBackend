const router = require("express").Router(),
    { create, find, unban, update, ban, createadmin, findstudent } = require("../Controllers/Teacher");

router
    .get("/find", find)
    .post("/create", create)
    .post("/findstudent", findstudent)
    .post("/createadmin", createadmin)
    .post("/update/:id", update)
    .post("/ban/:id", ban)
    // .post("/unban/:id", unban)

module.exports = router;