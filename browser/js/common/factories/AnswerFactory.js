app.factory('AnswerFactory', function($http) {

  var extractData = function(response) {
    return response.data;
  };

  var fac = {
    saveAnswer: function(answer) {
      return $http.post('/api/answers/', answer)
        .then(extractData)
        .then(null, console.error);
    },
    getAnswersByUserWithQuestion: function(userId, numAnswersToRetrieve) {
      if (numAnswersToRetrieve) {
        return $http.get('/api/answers/' + userId + '?questions=true&limit=' + numAnswersToRetrieve.toString())
          .then(extractData)
          .then(null, console.error);
      } else {
        return $http.get('/api/answers/' + userId + '?questions=true')
          .then(extractData)
          .then(null, console.error);
      }
    },
    getAnswersForQuestionExceptForThoseBy: function(questionId, userId) {
      return $http.get('/api/answers/not/' + userId + '/question/' + questionId)
        .then(extractData)
        .then(null, console.error);
    },
    getAnswersByUserForOnlyTheseQuestions: function(userId, questionIdsArray) {
      // var stringToAppendToRoute = questionIdsArray.reduce(function(snowball, curr) {
      //   return ""
      // }, "");
      console.log("USER ID");
      console.log(userId);
      var arrOfPromises = questionIdsArray.map(function(questionId) {
        return $http.get('/api/answers/' + userId + '/question/' + questionId);
      });
      return Promise.all(arrOfPromises)
        .then(function(responses) {
          return responses.map(function(response) {
            return response.data;
          })
        })
        .then(null, console.error);
    }
  };

  return fac;
});
