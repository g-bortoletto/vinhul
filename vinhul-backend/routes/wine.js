const express = require("express");
const fs = require("fs");
const db = require("../db");
const router = express.Router();

router.post('/createwine', (request, response) => {
  var obj = {
    name: request.body.name,
    origin: request.body.origin,
    type: request.body.type,
    grapeType: request.body.grapetype,
    foodHarmony: request.body.foodharmony,
    image: request.body.image
  };
  const WineModel = db.mongooseModule.model("wine", db.wineSchema, "wine");
  WineModel.countDocuments(obj, (error, count) => {
    if (error) {
      response.send({ result: "ERROR", message: error });
    } else if (count <= 0) {
      WineModel.create(obj, (error, item) => {
        if (error) {
          console.error(error);
        } else {
          item.save();
        }
      });
      response.send({ result: "OK", created: obj });
    } else {
      response.send({ result: "ERROR", message: "Wine already exists." });
    }
  });
});

router.get('/getsingle/:id', (request, response) => {
  const WineModel = db.mongooseModule.model("wine", db.wineSchema, "wine");
  WineModel.findById(request.params.id, (error, item) => {
    if (error) {
      response.send({ result: "ERROR", message: error });
    } else {
      response.send({ result: "OK", item: item });
    }
  });
});

router.get('/getwine', (request, response) => {
  var obj = {
    name: request.query.name,
    origin: request.query.origin,
    type: request.query.type,
    grapeType: request.query.grapetype,
    foodHarmony: request.query.foodharmony
  };

  WineModel = db.mongooseModule.model("wine", db.wineSchema, "wine");
  if (obj.name == undefined &&
    obj.origin == undefined &&
    obj.type == undefined &&
    obj.grapeType == undefined &&
    obj.foodHarmony == undefined) {
    WineModel.find().exec((error, documents) => {
      if (error) {
        response.send({ result: "ERROR" });
        return console.error(error);
      }
      else {
        response.send({ response: "OK", wines: documents });
      }
    });
  } else {
    WineModel.find(obj).exec((error, documents) => {
      if (error) {
        response.send({ result: "ERROR" });
        return console.error(error);
      }
      else {
        response.send({ response: "OK", wines: documents });
      }
    });
  }
});

router.put('/updatewine', (request, response) => {
  var updates = {
    name: request.query.name,
    origin: request.query.origin,
    type: request.query.type,
    grapeType: request.query.grapetype,
    foodHarmony: request.query.foodharmony,
    image: request.query.image
  };

  if (updates.name == undefined) {
    response.send({ result: "ERROR", message: "Wine does not exist." });
  }

  var WineModel = db.mongooseModule.model("wine", db.wineSchema, "wine");

  // This sucks
  WineModel.find({ name: updates.name }).lean().exec((error, document) => {
    if (updates.origin == undefined) { updates.origin = document.origin; }
    if (updates.type == undefined) { updates.type = document.type; }
    if (updates.grapeType == undefined) { updates.grapeType = document.grapeType; }
    if (updates.foodHarmony == undefined) { updates.foodHarmony = document.foodHarmony; }
    if (updates.image == undefined) { updates.image = document.image; }
  });

  WineModel.findOneAndUpdate({ name: updates.name }, {
    $set: {
      name: updates.name,
      origin: updates.origin,
      type: updates.type,
      grapeType: updates.grapeType,
      foodHarmony: updates.foodHarmony
    }
  }).then(result => {
    response.send({ result: "OK", document: result });
  }).catch(error => {
    response.send({ result: "ERROR", message: error });
  });
});

router.delete('/deletewine', (request, response) => {
  const WineModel = db.mongooseModule.model("wine", db.wineSchema, "wine");
  var name = request.query.name;

  WineModel.findOneAndRemove({ name: name }, (error, document) => {
    if (error) {
      response.send({ result: "ERROR", message: error });
    } else if (document == null) {
      // If can't find a document with this email, return error
      response.send({ result: "ERROR", message: "Wine does not exist." });
    } else {
      response.send({ result: "OK", document: document });
    }
  });
});

module.exports = router;
