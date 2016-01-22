app.factory('AnswerFactory', function($http) {

  var extractData = function(response) {
    return response.data;
  };

  var fac = {
    saveAnswer: function(answer) {
      return $http.post('/api/answers/', answer)
        .then(extractData)
        .then(function(savedAnswer) {
          console.log("This is the saved answer…");
          console.log(savedAnswer);
        })
        .then(null, console.error)
    }
  };

  return fac;
});
