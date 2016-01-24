'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Question = mongoose.model('Question');

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
  Question.find({}).exec()
    .then(function(allQuestions) {
        res.status(200).json(allQuestions);
    }).then(null, next);
});

router.get('/:id', function(req, res, next) {
	Question.find({_id: req.params.id})
	.then(function(questions){
		res.status(200).send(questions);
	})
	.then(null, next)
})
