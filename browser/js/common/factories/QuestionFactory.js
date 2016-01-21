app.factory('QuestionFactory', function($http) {
    var extractData = function(function) {

    };

    var fac = {
        getNewQuestions: function(startingQuestion, numQuestionsToGet) {
            $http.get('/api/questions/search/start=' + startingQuestion + '&num=' + numQuestionsToGet)
                .then(func)
        }
    };

    return fac;
});
