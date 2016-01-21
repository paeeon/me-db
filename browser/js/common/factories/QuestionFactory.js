app.factory('QuestionFactory', function($http) {
    var fac = {
        getNewQuestions: function(numToLimit) {
            $http.get('/api/questions/search' + '')
        }
    };

    return fac;
});
