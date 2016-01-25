app.config(function($stateProvider) {

  $stateProvider.state('answerQuestions', {
    url: '/questions/answer',
    templateUrl: 'js/answerQuestions/answerQuestions.html',
    controller: 'AnswerQuestionsController',
    resolve: {
      loggedInUser: function(AuthService) {
        if (AuthService.isAuthenticated) return AuthService.getLoggedInUser();
      },
      questions: function(loggedInUser, QuestionFactory) {
        return QuestionFactory.getUnansweredQuestionsForUser(loggedInUser, 15);
      }
    },
    data: {
      authenticate: true
    }
  });

});

app.controller('AnswerQuestionsController', function($scope, AnswerFactory, loggedInUser, questions, $animate, QuestionFactory) {

  var questionElement = document.getElementById('question');
  $scope.currentQuestionNum = 0;

  $scope.questionNum = questions.length - 1;
  $scope.question = questions[$scope.currentQuestionNum];

  var resetProgressBarValue = function() {
    return Math.floor($scope.currentQuestionNum / $scope.questionNum * 100);
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
        console.log('currentQuestionNum', $scope.currentQuestionNum);
        console.log('number of questions in total', $scope.questionNum);

        // Clear the answer text so that the textarea is clear when the question changes
        $scope.answer.text = "";

        if ($scope.currentQuestionNum === $scope.questionNum) {
          // …If we're at the last question in the set of available questions
          // currently on the scope…
            // Get more questions!
            $scope.currentQuestionNum = 0;
            return QuestionFactory.getUnansweredQuestionsForUser(loggedInUser, 15);
        } else {
          // …If we're NOT at the last question…
            // Increment current question number, so that we know to display a different
            // question to the user
          $scope.currentQuestionNum++;
          $scope.progressBarValue = resetProgressBarValue();
          $scope.question = questions[$scope.currentQuestionNum];
        }
      }).then(function(newQuestionsPotentially) {
        // Have to do a check here to see if the newQuestionsPotentially is an empty (array)?
        if (newQuestionsPotentially) $scope.question = questions[$scope.currentQuestionNum];
        return $animate.setClass(questionElement, 'fadeInRight', 'fadeOutLeft');
      }).then(null, console.error)
  };

});
