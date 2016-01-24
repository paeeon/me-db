app.config(function ($stateProvider) {

    $stateProvider.state('myDb', {
        url: '/db',
        templateUrl: 'js/myDb/myDb.html',
        controller: 'myDbController',
        resolve: {
            questions: function(QuestionFactory) {
                // Returns first 20 questions
                return QuestionFactory.getAllQuestions();
            },
            userId: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
            userAnswersWithQuestions: function(AnswerFactory, userId) {
                return AnswerFactory.getUserAnswersWithQuestions(userId._id);
            }
        },
        data: {
            authenticate: true
        }
    });

});

app.controller('myDbController', function ($scope, questions, userId, userAnswersWithQuestions, AnswerFactory) {

    $scope.questions = questions;

    console.log(userAnswersWithQuestions);

    $scope.userAnswers = userAnswersWithQuestions;

    // Get more questions


});
