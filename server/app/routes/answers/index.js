'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');

<<<<<<< HEAD
var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

// Gets all (or some) questions
// GET /api/questions/
router.get('/', function(req, res, next) {
    Answer.find({}).exec()
        .then(function(allQuestions) {
            res.status(200).send(allQuestions);
        }).then(null, next);
=======
var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).end();
  }
};

// Adds an answer
// POST /api/answers
router.post('/', function(req, res, next) {
  Answer.create(req.body)
    .then(function(answer) {
      console.log(answer);
      res.status(201).json(answer);
    }).then(null, next);
>>>>>>> master
});
