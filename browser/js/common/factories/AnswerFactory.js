app.factory('AnswerFactory', function($http) {

  var extractData = function(response) {
    console.log(response);
    return response.data;
  };

  var fac = {
    saveAnswer: function(answer) {
      return $http.post('/api/answers/', answer)
        .then(extractData)
        .then(null, console.error);
    },
    getAnswersByUserWithQuestion: function(userId) {
      return $http.get('/api/answers/' + userId + '?questions=true')
        .then(extractData)
        .then(null, console.error);
    },
    getAnswersForQuestionExceptForThoseBy: function(questionId, userId) {
      return $http.get('/api/answers/not/' + userId + '/question/' + questionId)
        .then(extractData)
        .then(null, console.error);
    }
  };

  return fac;
});
