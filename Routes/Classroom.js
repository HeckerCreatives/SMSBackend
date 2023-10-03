const router = require("express").Router(),
    { create, find, update, findadvisory } = require("../Controllers/Classroom");

router
    .get("/find", find)
    .post("/create", create)
    .post("/findadvisory", findadvisory)
    .post("/update/:id", update)

module.exports = router;