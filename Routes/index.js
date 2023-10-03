const routers = app => {
    console.log("All Routes are available")
    app.use("/teacher", require("./Teacher"))
    app.use("/yearandsection", require("./YearAndSection"))
    app.use("/quarter", require("./Quarter"))
    app.use("/student", require("./Student"))
    app.use("/subject", require("./Subject"))
    app.use("/classroom", require("./Classroom"))
    app.use("/role", require("./Roles"))
    app.use("/grade", require("./Grades"))
}

module.exports = routers