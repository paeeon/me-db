app.config(function($stateProvider) {
  $stateProvider.state('quiz', {
    url: '/quiz/user/:userId',
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
        return AnswerFactory.getAnswersByUserWithQuestion($stateParams.subjectUserId, 8)
          .then(function(answers) {
            return answers.map(function(el) {
              el.correct = true;
              return el;
            })
          }).then(null, console.error);
      }
    }
  });
});

app.controller('QuizController', function($scope, loggedInUser, correctAnswers, $stateParams, AnswerFactory, subjectOfQuiz, $state, $animate) {

  var questionElement = document.getElementById('quiz-question');
  $scope.subjectOfQuiz = subjectOfQuiz;
  $scope.answeredCorrectly = 0;
  $scope.questionsAnswered = 0;
  $scope.totalNumOfQuestions = correctAnswers.length - 1;

  $scope.question = correctAnswers[$scope.questionsAnswered].question;
  $scope.answer = correctAnswers[$scope.questionsAnswered];

  //array to store list of answers before randomizing
  $scope.answerArr = [$scope.answer];

  //method for shuffling answers
  var shuffle = function(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;

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

  $scope.backToQuizzes = function() {
    $('.basic.modal.quiz-complete').modal('hide');
    $state.go('quizList');
  };

  $scope.submitAnswer = function(answer) {

    $animate.addClass(questionElement, 'fadeOutLeft')
      .then(function() {
        console.log('questions answered', $scope.questionsAnswered);
        console.log('number of questions in total', $scope.totalNumOfQuestions);

        if ($scope.questionsAnswered === $scope.totalNumOfQuestions) {
          // …If we're at the last question in the set of available questions
          // currently on the scope, the quiz is finished!
          $('.basic.modal.quiz-complete').modal('show');
        } else {
          // …If we're NOT at the last question…

          // If the user has selected the correct answer, increment the answeredCorrectly count
          if (answer.correct) $scope.answeredCorrectly++;

          // Increment the number of total questions the user has answered
          $scope.questionsAnswered++;

          // Change the question we're showing
          $scope.question = correctAnswers[$scope.questionsAnswered].question;

          // Change the answers we're showing
          $scope.answer = correctAnswers[$scope.questionsAnswered];

          // Change the score
          $scope.score = $scope.answeredCorrectly / $scope.totalNumOfQuestions;

          //array to store list of answers before randomizing
          $scope.answerArr = [$scope.answer];

          return AnswerFactory.getAnswersForQuestionExceptForThoseBy(correctAnswers[$scope.questionsAnswered].question._id, $stateParams.userId)
        }
      }).then(function(answersForNextQuestion) {
        // Check if answersForNextQuestion exists and is not empty.
        // (It could be empty if the user has already finished the quiz)
        if (answersForNextQuestion && answersForNextQuestion.length > 0) {
          $scope.randomWrongAnswer = answersForNextQuestion[Math.floor(Math.random() * answersForNextQuestion.length)];
          $scope.answerArr.push($scope.randomWrongAnswer);
          console.log("scope.answerArr…");
          console.log($scope.answerArr);
          //shuffle array of answers
          shuffle($scope.answerArr);
          return $animate.setClass(questionElement, 'fadeInRight', 'fadeOutLeft');
        }
      }).then(null, console.error);

  };

  $scope.correctProgressScore = function() {
    var percent = Math.ceil(($scope.answeredCorrectly / ($scope.totalNumOfQuestions + 1)) * 100);
    return percent;
  }

  $scope.incorrectProgressScore = function() {
    var percent = Math.ceil(($scope.questionsAnswered - $scope.answeredCorrectly) / ($scope.totalNumOfQuestions + 1) * 100);
    if ($scope.questionsAnswered < 1) return 0;
    return percent;
  }

});
