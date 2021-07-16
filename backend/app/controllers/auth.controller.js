const Auth = require("../models/auth.model");
const jwt = require('jsonwebtoken');
const config = require('../config/db.config');

exports.register = (req, res) => {
    const { username, password, type, active } = req.body;

    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const auth = new Auth({
      username,
      password,
      type,
      active
    });
  
    // Save Customer in the database
    Auth.register(auth, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      else res.json({ success: true });
    });
};

exports.authenticate = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Auth.getUserByUsername(username, (err, data) => {
    if(err) throw err;
    
    if(!data) {
      return res.json({ success: false, msg: 'User not found.' });
    }

    Auth.comparePassword(password, data.password, (err, isMatch) => {
      if(err) throw err;

      if(isMatch) {

        const authUser = {
          id: data.id,
          username: data.username,
          type: data.type,
          active: data.active
        }

        const token = jwt.sign(authUser, config.secret, {
          expiresIn: 604800
        });

        res.json({
          success: true,
          token: `JWT ${token}`,
          user: {
            id: data.id,
            username: data.username,
            type: data.type
          }
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password.' });
      }
    });
  });
}

exports.profile = (req, res) => {
  res.send("profile");
}