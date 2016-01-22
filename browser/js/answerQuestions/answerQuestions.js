app.config(function ($stateProvider) {

    $stateProvider.state('answerQuestions', {
        url: '/questions/answer',
        templateUrl: 'js/answerQuestions/answerQuestions.html',
        controller: 'AnswerQuestionsController',
        resolve: {
            questions: function(QuestionFactory) {
                return QuestionFactory.getAllQuestions();
            }
        },
        data: {
            authenticate: true
        }
    });

});

app.controller('AnswerQuestionsController', function ($scope, questions) {

    $scope.currentQuestionNum = 0;
    $scope.answered = 0;
    $scope.questionNum = 15;

    $scope.value = Math.floor($scope.answered/$scope.questionNum *100);

    $scope.saveAnswer = function() {
        AnswerFactory.saveAnswer($scope.answer)
    }

});
