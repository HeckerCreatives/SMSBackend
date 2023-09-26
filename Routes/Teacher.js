const router = require("express").Router(),
    { create, find, unban, update, ban } = require("../Controllers/Teacher");

router
    .get("/find", find)
    .post("/create", create)
    .post("/update/:id", update)
    .post("/ban/:id", ban)
    .post("/unban/:id", unban)

module.exports = router;