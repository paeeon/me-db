app.config(function ($stateProvider) {

    $stateProvider.state('answerQuestions', {
        url: '/questions/answer',
        templateUrl: 'js/answerQuestions/answerQuestions.html',
        controller: 'AnswerQuestionsController',
        resolve: {
            questions: function(QuestionFactory) {
                // Returns first 20 questions
                return QuestionFactory.getAllQuestions();
            }
        },
        data: {
            authenticate: true
        }
    });

});

app.controller('AnswerQuestionsController', function ($scope, questions) {

    $scope.questions = questions;

    // Get more questions


});
