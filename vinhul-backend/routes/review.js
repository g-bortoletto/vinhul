const express = require("express");
const db = require("../db");
const router = express.Router();

router.post('/createreview', (request, response) => {
  var obj = {
    score: request.body.score,
    title: request.body.title,
    message: request.body.message,
  };
  const ReviewModel = db.mongooseModule.model("review", db.reviewSchema, "review");
  ReviewModel.countDocuments(obj, (error, count) => {
    if (error) {
      response.send({ result: "ERROR", message: error });
    } else if (count <= 0) {
      ReviewModel.create(obj, (error, item) => {
        if (error) {
          console.error(error);
        } else {
          item.save();
        }
      });
      response.send({ result: "OK", created: obj });
    } else {
      response.send({ result: "ERROR", message: "Review already exists." });
    }
  });
});

router.get('/getreview', (request, response) => {
  var obj = {
    score: request.query.score,
    title: request.query.title,
    message: request.query.message,
  };

  ReviewModel = db.mongooseModule.model("review", db.reviewSchema, "review");
  if (obj.score == undefined &&
      obj.title == undefined &&
      obj.message == undefined) {
    ReviewModel.find().exec((error, documents) => {
      if (error) {
        response.send({ result: "ERROR" });
        return console.error(error);
      }
      else {
        response.send({ response: "OK", reviews: documents });
      }
    });
  } else {
    ReviewModel.find(obj).exec((error, documents) => {
      if (error) {
        response.send({ result: "ERROR" });
        return console.error(error);
      }
      else {
        response.send({ response: "OK", reviews: documents });
      }
    });
  }
});

router.put('/updatereview', (request, response) => {
  var updates = {
    score: request.query.score,
    title: request.query.title,
    message: request.query.message
  };

  if (updates.title == undefined) {
    response.send({ result: "ERROR", message: "Review does not exist." });
  }

  var ReviewModel = db.mongooseModule.model("review", db.reviewSchema, "review");

  // This sucks
  ReviewModel.find({ title: updates.title }).lean().exec((error, document) => {
    if (updates.score   == undefined) { updates.score   = document.score;   }
    if (updates.title   == undefined) { updates.title   = document.title  ; }
    if (updates.message == undefined) { updates.message = document.message; }
  });

  ReviewModel.findOneAndUpdate({ title: updates.title }, {
    $set: {
      score: updates.score,
      title: updates.title,
      message: updates.message
    }
  }).then(result => {
    response.send({ result: "OK", document: result });
  }).catch(error => {
    response.send({ result: "ERROR", message: error });
  });
});

router.delete('/deletereview', (request, response) => {
  const ReviewModel = db.mongooseModule.model("review", db.reviewSchema, "review");
  var title = request.query.title;

  ReviewModel.findOneAndRemove({ title: title }, (error, document) => {
    if (error) {
      response.send({ result: "ERROR", message: error });
    } else if (document == null) {
      // If can't find a document with this email, return error
      response.send({ result: "ERROR", message: "Review does not exist." });
    } else {
      response.send({ result: "OK", document: document });
    }
  });
});

module.exports = router;
