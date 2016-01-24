app.config(function ($stateProvider) {

    $stateProvider.state('myDb', {
        url: '/db',
        templateUrl: 'js/myDb/myDb.html',
        controller: 'myDbController',
        resolve: {
            questions: function(QuestionFactory) {
                return QuestionFactory.getAllQuestions();
            },
            user: function(AuthService) {
                if (AuthService.isAuthenticated) return AuthService.getLoggedInUser();
            },
            userAnswers: function(AnswerFactory, user) {
                return AnswerFactory.getAnswersByUserWithQuestion(user._id);
            }
        },
        data: {
            authenticate: true
        }
    });

});

app.controller('myDbController', function ($scope, questions, user, userAnswers, AnswerFactory) {

    console.log(user);
    console.log(userAnswers);
    $scope.questions = questions;

    $scope.userAnswers = userAnswers;

});
