app.factory('QuestionFactory', function($http) {
    var extractData = function(response) {
        return response.data;
    };

    var fac = {
        // Incomplete function for getting only SOME questions, may not be necessary
        getNewQuestions: function(startingQuestion, numQuestionsToGet) {
            $http.get('/api/questions/start=' + startingQuestion + '&num=' + numQuestionsToGet)
                .then(extractData)
                .then(null, console.error);
        },
        getAllQuestions: function() {
            $http.get('/api/questions/')
                .then(extractData)
                .then(null, console.error);
        },
    };

    return fac;
});
