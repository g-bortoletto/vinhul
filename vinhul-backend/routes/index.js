const express = require("express");
const db = require("../db");
const router = express.Router();

router.get('/', (request, response) => {
  response.redirect('/home');
});

router.get('/home', (request, response) => {
  response.render('index');
});

module.exports = router;
