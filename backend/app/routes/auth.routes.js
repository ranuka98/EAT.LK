const authController = require("../controllers/auth.controller");
const passport = require('passport');

module.exports = app => {
    // authenticate
    app.post("/authenticate", authController.authenticate);
    // Register
    app.post("/register", authController.register);
    // Guarded route
    app.get("/profile", passport.authenticate('jwt', { session: false }), authController.profile);
}