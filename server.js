const express = require("express");
const mongoose = require("mongoose");
const port = 4000;
const app = express();
const cors = require("cors");
require("dotenv").config();
mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let db = mongoose.connection;
db.on('error', ()=> console.error.bind(console, "Connection to Database has an Error!"));
db.once('open', ()=> console.log("We are now Connected to the Cloud."))

const corsConfig = {
    origin: ["http://localhost:8100","http://localhost:8100/"],
    methods: ["GET", "POST", "PUT", "DELETE"], // List only` available methods
    credentials: true, // Must be set to true
    allowedHeaders: [
      "Origin",
      "Content-Type",
      "X-Requested-With",
      "Accept",
      "Authorization",
    ], // Allowed Headers to be received
};

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(corsConfig))

require("./Routes")(app);

app.listen(port, ()=> console.log(`Server is running at port ${port}`));