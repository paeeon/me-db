app.factory('QuestionFactory', function($http) {
  var extractData = function(response) {
    return response.data;
  };

  var fac = {
    getAllQuestions: function() {
      return $http.get('/api/questions/')
        .then(extractData)
        .then(null, console.error);
    },
    getUnansweredQuestionsForUser: function(user, numQuestionsToReturn) {
      return $http.get('/api/user/' + user._id + '/questions/unanswered?limit=' + numQuestionsToReturn)
        .then(extractData)
        .then(null, console.error);
    }
  };

  return fac;
});
