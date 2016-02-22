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

// Gets all of a specific user's POTENTIAL friends that match a query,
// i.e. not themselves and not their friends
// GET /api/user/:userId/friends/:query
router.get('/:userId/friends/:query', function(req, res, next) {
  // console.log("Here's the regex expression…");
  // console.log('/' + req.params.query + '/i');
  User.findById(req.params.userId)
    .then(function(user) {
      var regexifiedQuery = '/' + req.params.query + '/i';
      return User.find({
        _id: { $nin: user.friends },
        firstName: { $regex: regexifiedQuery }
      });
    }).then(function(matchingUsers) {
      console.log("Here are all the users that match the query…");
      console.log(matchingUsers);
      res.status(200).json(matchingUsers);
    })
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
    .then(function(userWithFriends) {
      console.log(userWithFriends);
      res.status(200).json(userWithFriends);
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
