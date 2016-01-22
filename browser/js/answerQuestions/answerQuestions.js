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

app.controller('AnswerQuestionsController', function($scope, questions, AnswerFactory, loggedInUser, $animate) {

  var questionElement = document.getElementById('question');
  $scope.currentQuestionNum = 0;

  $scope.questionNum = 15;
  $scope.question = questions[$scope.currentQuestionNum];

  var resetProgressBarValue = function() {
    return Math.floor($scope.currentQuestionNum/$scope.questionNum *100);
  };

  $scope.progressBarValue = resetProgressBarValue();

  $scope.saveAnswer = function() {

    // Adds some other properties to $scope.answer so that the object also has the
    // user._id and question._id reference
    $scope.answer.user = loggedInUser._id;
    $scope.answer.question = questions[$scope.currentQuestionNum]._id;

    // Save the answer to the DB
    $animate.addClass(questionElement, 'fadeOutLeft')
      .then(function() {
        return AnswerFactory.saveAnswer($scope.answer)
      }).then(function(answer) {
        // Clear the answer text so that the textarea is clear when the question changes
        $scope.answer.text = "";
        // Increment current question number, so that we know to display a different
        // question to the user
        $scope.currentQuestionNum++;
        $scope.progressBarValue = resetProgressBarValue();
        $scope.question = questions[$scope.currentQuestionNum];
      }).then(function() {
        return $animate.setClass(questionElement, 'fadeInRight', 'fadeOutLeft');
      }).then(null, console.error)
  };

});
