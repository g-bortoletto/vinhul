const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

router.post("/createaccount", (req, res) => {
  const db = require("../db");
  const UserModel = db.mongooseModule.model("user", db.userSchema, "user");
  var userEmail = req.body.email;
  var userPassword = req.body.password;
  var userName = req.body.username;
  var newUser = new UserModel({ email: userEmail, password: userPassword, userName: userName });
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

router.get("/login", (req, res) => {
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

router.get("/getaccount", (req, res) => {
  const db = require("../db");
  const UserModel = db.mongooseModule.model("user", db.userSchema, "user");

  var userEmail = req.query.email;
  var message = `[MESSAGE] GET request for ${userEmail}`;
  console.log(message);

  if (userEmail == undefined) {
    UserModel.find({}).lean().exec((error, document) => {
      if (error) {
        message += "[ERROR] " + error;
        res.send({ result: "ERROR" });
      }
      else {
        res.send(document);
      }
      console.log(message);
    });
  }
  else {
    UserModel.find({ email: userEmail }).lean().exec((error, document) => {
      if (error) {
        message += "[ERROR] " + error;
        res.send({ result: "ERROR" });
      }
      else {
        res.send(document);
      }
    });
  }
});

router.put('/updateaccount', (request, response) => {
  const db = require("../db");
  const UserModel = db.mongooseModule.model("user", db.userSchema, "user");

  var userName = request.body.name;
  var userEmail = request.body.email;
  var userPassword = request.body.password;

  UserModel.findOneAndUpdate({ email: userEmail }, {
    $set: {
      name: userName,
      email: userEmail,
      password: userPassword
    }
  }).then(result => {
    res.send({ result: result });
  }).catch(error => {
    console.error(error);
  });
});

router.delete("/deleteaccount/", (req, res) => {
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
