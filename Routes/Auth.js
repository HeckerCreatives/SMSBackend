const router = require("express").Router(),
    { login } = require("../Controllers/Auth");

router
    .post("/login", login)

module.exports = router;