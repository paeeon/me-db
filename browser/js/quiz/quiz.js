app.config(function($stateProvider) {
  $stateProvider.state('quiz', {
    url: '/quiz/:userId',
    templateUrl: 'js/quiz/quiz.html',
    controller: 'QuizController',
    resolve: {
      loggedInUser: function(AuthService) {
        if (AuthService.isAuthenticated) return AuthService.getLoggedInUser();
      },
      subjectOfQuiz: function($stateParams, UserFactory) {
        return UserFactory.getOneUser($stateParams.userId);
      },
      correctAnswers: function($stateParams, AnswerFactory) {
        return AnswerFactory.getAnswersByUserWithQuestion($stateParams.userId)
        .then(function(answers){
          return answers.map(function(el){
              el.correct = true;
              return el;
          })
        });
      }
    }
  });
});

app.controller('QuizController', function($scope, loggedInUser, correctAnswers, $stateParams, AnswerFactory, subjectOfQuiz) {

  console.log("correc", correctAnswers);

  $scope.subjectOfQuiz = subjectOfQuiz;

  $scope.answeredCorrectly = 0;
  $scope.questionsAnswered = 0;
  $scope.totalNumOfQuestions = correctAnswers.length - 1;

  $scope.question = correctAnswers[$scope.questionsAnswered].question;
  $scope.answer = correctAnswers[$scope.questionsAnswered];

  //array to store list of answers before randomizing
  $scope.answerArr = [$scope.answer]

  //method for shuffling answers
  var shuffle = function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  AnswerFactory.getAnswersForQuestionExceptForThoseBy(correctAnswers[$scope.questionsAnswered].question._id, $stateParams.userId)
    .then(function(wrongAnswers) {
      $scope.randomWrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
      $scope.answerArr.push($scope.randomWrongAnswer);
      //shuffle array of answers
      shuffle($scope.answerArr);
    }).then(null, console.error);

    $scope.submitAnswer = function(answer) {
      if (answer.correct) {
        $scope.answeredCorrectly ++;
      }
      $scope.questionsAnswered++;
      $scope.score = $scope.answeredCorrectly + " / " + $scope.questionsAnswered;
    }


});
