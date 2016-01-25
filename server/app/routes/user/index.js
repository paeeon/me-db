'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Answer = mongoose.model('Answer');
var Question = mongoose.model('Question');

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).end();
  }
};

// Gets all users but NOT myself
// GET /api/user/not/:userId
router.get('/not/:userId/', function(req, res, next) {
  User.find({ _id: { $ne: req.params.userId } })
    .then(function(users) {
      res.status(200).json(users);
    }).then(null, next);
});

// Get one user
// GET /api/user/:userId
router.get('/:userId', function(req, res, next) {
  console.log("the userid", req.params.userId);
  // if (req.params.userId === 'all') console.log("THE USER ID IS ALL");
  // next();
  User.findById(req.params.userId)
    .then(function(user) {
      res.status(200).json(user);
    }).then(null, next);
});

// Gets all of a specific user's friends
// GET /api/user/:userId/friends
router.get('/:userId/friends', function(req, res, next) {
  User.findById(req.params.userId).populate('friends')
    .then(function(friends) {
      res.status(200).json(friends);
    }).then(null, next);
});

// Gets all users
// GET /api/user/
router.get('/', function(req, res, next) {
  User.find({})
    .then(function(users) {
      res.status(200).json(users);
    }).then(null, next);
});

// Gets only unanswered questions, and limits it by a certain amount
// GET /api/user/:userId/questions/unanswered?limit=15
router.get('/:userId/questions/unanswered', function(req, res, next) {
  Answer.find({ user: req.params.userId })
    .then(function(userAnswers) {
      var userAnswerIds = userAnswers.map(function(answer) {
        return answer.question.toString();
      });
      return Question.find({
        _id: { $nin: userAnswerIds }
      }).limit(parseInt(req.query.limit));
    }).then(function(unansweredQuestions) {
      console.log(unansweredQuestions);
      res.status(200).json(unansweredQuestions);
    }).then(null, next);
});
