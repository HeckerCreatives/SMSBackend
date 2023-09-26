const router = require("express").Router(),
    { create, find, } = require("../Controllers/Quarter");

router
    .get("/find", find)
    .post("/create", create)

module.exports = router;