const router = require("express").Router(),
    { create, find, unban, update, ban, createadmin } = require("../Controllers/Teacher");

router
    .get("/find", find)
    .post("/create", create)
    .post("/createadmin", createadmin)
    .post("/update/:id", update)
    .post("/ban/:id", ban)
    .post("/unban/:id", unban)

module.exports = router;