const router = require("express").Router(),
    { create, find, update } = require("../Controllers/Classroom");

router
    .get("/find", find)
    .post("/create", create)
    .post("/update/:id", update)

module.exports = router;