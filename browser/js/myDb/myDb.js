app.config(function ($stateProvider) {

    $stateProvider.state('myDb', {
        url: '/db',
        templateUrl: 'js/myDb/myDb.html',
        controller: 'myDbController',
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

app.controller('myDbController', function ($scope, questions) {

    $scope.questions = questions;
    // Get more questions


});
