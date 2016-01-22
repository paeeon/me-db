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
            }
        },
        data: {
            authenticate: true
        }
    });

});

app.controller('myDbController', function ($scope, questions, userId) {

    $scope.questions = questions;

    console.log(userId._id);

    $scope.usersQuestions;



    // Get more questions


});
