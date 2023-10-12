const router = require("express").Router(),
    { create, find, update} = require("../Controllers/Quarter");

router
    .get("/find", find)
    .post("/create", create)
    .post("/update", update)
module.exports = router;