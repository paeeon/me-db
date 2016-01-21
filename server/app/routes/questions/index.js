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
router.get('/api/questions/', function(req, res, next) {
    // If we need to limit the returned questions
    // if (req.query) {
    //     Question.find({}).

    //     })
    // } else {
        Question.find({})
            .then(function(allQuestions) {
                req.status(200).json(allQuestions);
            }).then(null, next);
    // }
});
