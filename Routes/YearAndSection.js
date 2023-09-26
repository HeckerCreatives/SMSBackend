const router = require("express").Router(),
    { create, find, update, destroy } = require("../Controllers/YearandSection");

router
    .get("/find", find)
    .post("/create", create)
    .post("/update/:id", update)
    .post("/destroy/:id", destroy)

module.exports = router;