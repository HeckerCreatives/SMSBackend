const router = require("express").Router(),
    { create } = require("../Controllers/Roles");

router
    .post("/create", create)

module.exports = router;