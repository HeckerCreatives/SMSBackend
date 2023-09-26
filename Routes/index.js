const routers = app => {
    console.log("All Routes are available")
    app.use("/teacher", require("./Teacher"))
    app.use("/yearandsection", require("./YearAndSection"))
    app.use("/quarter", require("./Quarter"))
    app.use("/student", require("./Student"))
}

module.exports = routers