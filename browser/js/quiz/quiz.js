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
        return AnswerFactory.getAnswersByUserWithQuestion($stateParams.userId);
      }
    }
  });
});

app.controller('QuizController', function($scope, loggedInUser, correctAnswers, $stateParams, AnswerFactory, subjectOfQuiz) {

  console.log(correctAnswers);

  $scope.subjectOfQuiz = subjectOfQuiz;

  $scope.questionsAnswered = 0;
  $scope.totalNumOfQuestions = correctAnswers.length - 1;

  $scope.question = correctAnswers[$scope.questionsAnswered].question;
  $scope.answer = correctAnswers[$scope.questionsAnswered].text;

  AnswerFactory.getAnswersForQuestionExceptForThoseBy(correctAnswers[$scope.questionsAnswered].question._id, $stateParams.userId)
    .then(function(wrongAnswers) {
      $scope.randomWrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)].text;
    }).then(null, console.error);

});
