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

// Gets all (or some) questions
// GET /api/questions/
router.get('/', function(req, res, next) {
    Answer.find({}).exec()
        .then(function(allQuestions) {
            res.status(200).send(allQuestions);
        }).then(null, next);
});

router.get('/:id', function(req, res, next) {
	Answer.find({user: req.params.id})
	.then(function(answers){
		res.status(200).send(answers)
	})
	.then(null,next)
})