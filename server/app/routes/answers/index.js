'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/:id', function(req, res, next) {
	Answer.find({"user": req.params.id})
	.populate('question')
	.then(function(answers){
		res.status(200).send(answers);
	})
	.then(null, next)
})

router.get('/', function(req, res, next) {
	Answer.find({}).exec()
	.then(function(answers){
		res.status(200).send(answers);
	})
	.then(null, next)
})

// Adds an answer
// POST /api/answers
router.post('/', function(req, res, next) {
  Answer.create(req.body)
    .then(function(answer) {
      console.log(answer);
      res.status(201).json(answer);
    }).then(null, next);
});
