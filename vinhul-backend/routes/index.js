const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/user/adduser", (req, res) => {
  const db = require("../db");
  const UserModel = db.mongooseModule.model("user", db.userSchema, "user");
  var userEmail = req.body.email;
  var userPassword = req.body.password;
  var newUser = new UserModel({ email: userEmail, password: userPassword });
  var response = "[MESSAGE] POST request to adduser.\n";

  UserModel.countDocuments({ email: userEmail }, ((err, count) => {
    if (err) {
      response += "[ERROR] " + err;
    } else if (count > 0) { // Check if user doesn't already have an account
      response += "[ERROR] This email already has an account.";
    } else {
      // If user doesn't have account, saves the new document
      response += "[MESSAGE] User added to database.";

      newUser.save((error, data) => {
        if (error) {
          console.error(error);
          res.send({ result: "ERROR" });
        } else {
          console.log(data);
          res.send({ result: "OK" });
        }
      });
    }
    console.log(response);
  }));
});

router.get("/user/login", (req, res) => {
  const db = require("../db");
  const UserModel = db.mongooseModule.model("user", db.userSchema, "user");
  // Gets email and password from querying url
  var email = req.query.email;
  var password = req.query.password;
  var response = "[MESSAGE] GET request to login.\n";

  // Counts how many documents have this email and password
  UserModel.countDocuments({ email: email, password: password }, (error, count) => {
    if (error) {
      response += "[ERROR] " + error;
      res.send({ result: "ERROR" });
    } else if (count <= 0) {
      // If user doesn't have an account, return error.
      response += "[ERROR] User not found.";
      res.send({ result: "ERROR" });
    } else {
      response += "[MESSAGE] User found.";
      res.send({ result: "OK" });
    }
    console.log(response);
  });
});

router.delete("/user/eraseaccount/", (req, res) => {
  const db = require("../db");
  const UserModel = db.mongooseModule.model("user", db.userSchema, "user");
  var email = req.query.email;
  var response = "[MESSAGE] DELETE request to erase account.\n";
  UserModel.findOneAndRemove({ email: email }, (error, _, __) => {
    if (error) {
      response += "[ERROR] " + error;
      res.send({ result: "ERROR" });
    } else if (document == null) {
      // If can't find a document with this email, return error
      response += "[ERROR] User not found.";
      res.send({ result: "ERROR" });
    } else {
      response += "[MESSAGE] Account erased.";
      res.send({ result: "OK" });
    }
    console.log(response);
  });
});

module.exports = router;
