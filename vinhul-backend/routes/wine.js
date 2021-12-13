const express = require("express");
const path = require("path");
const fs = require("fs");
const req = require("express/lib/request");
const db = require("../db");
const router = express.Router();
const app = require("../app");

const multer = require('multer');

var storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (request, file, cb) => {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

router.post('/createwine', upload.single('image'), (request, response) => {
  var obj = {
    origin: request.body.origin,
    type: request.body.type,
    grapeType: request.body.grapetype,
    foodHarmony: request.body.foodharmony,
    image: {
      data: fs.readFileSync("./uploads/" + request.file.originalname),
      contentType: 'image/png'
    }
  };
  const WineModel = db.mongooseModule.model("wine", db.wineSchema, "wine");
  WineModel.countDocuments(obj, (error, count) => {
    if (error)
    {
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

router.get('/getwine', (request, response) => {
  var obj = {
    origin: request.query.origin,
    type: request.query.type,
    grapeType: request.query.grapetype,
    foodHarmony: request.query.foodharmony
  }

  WineModel = db.mongooseModule.model("wine", db.wineSchema, "wine");
  WineModel.find(obj).exec((error, documents) => {
    if (error)
    {
      response.send({ result: "ERROR" });
      return console.error(error);
    }
    else
    {
      response.send({ response: "OK", wines: documents });
    }
  });
});

router.put('/updatewine', (request, response) => {});

router.delete('/deletewine', (request, response) => {});

module.exports = router;
