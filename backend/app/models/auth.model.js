const sql = require("./db.js");
const bcrypt = require("bcrypt");

// constructor
const Auth = function(credentials) {
  this.username = credentials.username;
  this.password = credentials.password;
  this.type = credentials.type,
  this.active = credentials.active
};

Auth.register = (credentials, result) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(credentials.password, salt, (err, hash) => {
            
            if (err) throw err;
            
            credentials.password = hash;
            sql.query("INSERT INTO users SET ?", credentials, (err, res) => {
                if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }
            
                console.log("created user: ", { id: res.insertId, ...credentials });
                result(null, { id: res.insertId, ...credentials });
            });
        })
    });
}

Auth.getUserByUsername = (username, result) => {
    sql.query(`SELECT * FROM users WHERE username='${username}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
    
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
    
        result({ kind: "not_found" }, null);
    });
}

Auth.getUserById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE id=${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
    
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
    
        result({ kind: "not_found" }, null);
    });
}

Auth.comparePassword = (candidatePassword, hash, result) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;

        result(null, isMatch);
    });
}

module.exports = Auth;