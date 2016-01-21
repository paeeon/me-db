app.config(function ($stateProvider) {

    $stateProvider.state('myDb', {
        url: '/db',
        templateUrl: 'js/myDb/myDb.html',
        controller: 'myDbController',
        resolve: {
            newQuestions: function(QuestionFactory) {
                // Returns 20 new questions
                return QuestionFactory.getNewQuestions(20);
            }
        }
    });

});

app.controller('myDbController', function ($scope, newQuestions) {

    $scope.questions = newQuestions;

    // Get more questions

});
