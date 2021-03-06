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

// $http.get('/api/answers/' + userId + '/question/' + questionId)
router.get('/:userId/question/:questionId', function(req, res, next) {
  Answer.findOne({
    user: { $eq: req.params.userId },
    question: { $eq: req.params.questionId }
  }).then(function(answer) {
    console.log(answer);
    res.status(200).json(answer);
  }).then(null, next);
});

// Gets answers by user, with questions populated
// GET /api/answers/:userId
router.get('/:userId', function(req, res, next) {
  if (req.query && req.query.questions === 'true' && req.query.limit) {
    Answer.find({ user: req.params.userId })
    .limit(parseInt(req.query.limit))
    .populate('question')
      .then(function(answers) {
        res.status(200).json(answers);
      }).then(null, next);
  } else if (req.query && req.query.questions === 'true') {
    Answer.find({ user: req.params.userId })
    .populate('question')
      .then(function(answers) {
        res.status(200).json(answers);
      }).then(null, next);
  } else {
    Answer.find({ user: req.params.userId })
      .then(function(answers) {
        res.status(200).json(answers);
      }).then(null, next);
  }
});

// Gets answers for a particular question EXCEPT for those by a certain user
// GET /api/answers/not/:userId/question/:questionId
router.get('/not/:userId/question/:questionId', function(req, res, next) {
  Answer.find({
    user: { $ne: req.params.userId },
    question: { $eq: req.params.questionId }
  }).populate('user').then(function(answers) {
    res.status(200).json(answers);
  }).then(null, next);
});
