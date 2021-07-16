const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Auth = require('../models/auth.model');
const config = require('./db.config');

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        Auth.getUserById(jwt_payload.id, (err, data) => {
            if(err) {
                return done(err, false);
            }
            if(data) {
                return done(null, data);
            } else {
                return done(null, false);
            }
        })
    }));
}