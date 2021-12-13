const express = require('express');
const res     = require('express/lib/response');
const router  = express.Router();

router.post("/createaccount", (request, response) => {
  const db = require("../db");
  const UserModel = db.mongooseModule.model("user", db.userSchema, "user");
  var newObj = {
    email: request.body.email,
    password: request.body.password,
    name: request.body.name
  }

  UserModel.countDocuments({ email: newObj.email }, ((error, count) => {
    if (error) {
      response.send({ result: "ERROR", message: error });
    } else if (count > 0) { // Check if user doesn't already have an account
      response.send({ result: "ERROR", message: "User already has an account." });
    } else {
      // If user doesn't have account, saves the new document
      UserModel.create(newObj, (error, item) => {
        if (error) {
          response.send({ result: "ERROR", message: error });
        } else {
          item.save();
          response.send({ result: "OK", document: newObj });
        }
      });
    }
  }));
});

router.get("/login", (req, res) => {
  const db = require("../db");
  const UserModel = db.mongooseModule.model("user", db.userSchema, "user");
  // Gets email and password from querying url
  var email = req.query.email;
  var password = req.query.password;

  // Counts how many documents have this email and password
  UserModel.countDocuments({ email: email, password: password }, (error, count) => {
    if (error) {
      res.send({ result: "ERROR", message: error });
    } else if (count <= 0) {
      // If user doesn't have an account, return error.
      res.send({ result: "ERROR", message: "User doesn't have an account." });
    } else {
      res.send({ result: "OK", message: "Logged in." });
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
