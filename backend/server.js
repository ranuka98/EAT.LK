// const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const passport = require("passport");

const authRoute = require('./app/routes/auth.routes');

const app = express();

// parse requests of content-type: application/json
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./app/config/passport')(passport);

// parse requests of content-type: application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Routes
require("./app/routes/customer.routes.js")(app);
require("./app/routes/auth.routes")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});