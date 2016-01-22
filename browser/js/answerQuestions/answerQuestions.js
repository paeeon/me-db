app.config(function($stateProvider) {

  $stateProvider.state('answerQuestions', {
    url: '/questions/answer',
    templateUrl: 'js/answerQuestions/answerQuestions.html',
    controller: 'AnswerQuestionsController',
    resolve: {
      questions: function(QuestionFactory) {
        return QuestionFactory.getAllQuestions();
      },
      loggedInUser: function(AuthService) {
        if (AuthService.isAuthenticated) return AuthService.getLoggedInUser();
      }
    },
    data: {
      authenticate: true
    }
  });

});

app.controller('AnswerQuestionsController', function($scope, questions, AnswerFactory, loggedInUser) {

  $scope.currentQuestionNum = 0;
  $scope.question = questions[$scope.currentQuestionNum];

  $scope.saveAnswer = function() {
    // Adds some other properties to $scope.answer so that the object also has the
    // user._id and question._id reference
    $scope.answer.user = loggedInUser._id;
    $scope.answer.question = questions[$scope.currentQuestionNum]._id;

    // Save the answer to the DB
    AnswerFactory.saveAnswer($scope.answer)
      .then(function(answer) {
        // Increment current question number, so that we know to display a different
        // question to the user
        $scope.currentQuestionNum++;
        $scope.question = questions[$scope.currentQuestionNum];
      })
      .then(null, console.error)
  };


});
