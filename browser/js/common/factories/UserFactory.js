app.factory('UserFactory', function($http) {

  var extractData = function(response) {
    return response.data;
  };

  var fac = {
    getOneUser: function(userId) {
      return $http.get('/api/user/' + userId)
        .then(extractData)
        .then(null, console.error);
    },
    getAllFriendsOf: function(userId) {
      return $http.get('/api/user/' + userId + '/friends')
        .then(extractData)
        .then(null, console.error);
    },
    getAllUsers: function() {
      return $http.get('/api/user/')
        .then(extractData)
        .then(null, console.error);
    },
    getAllUsersExceptMyself: function(userId) {
      return $http.get('/api/user/not/' + userId)
        .then(extractData)
        .then(null, console.error);
    },
    getAllPotentialFriendsThatMatchThisQuery: function(userId, query) {
      return $http.get('/api/user/' + userId + '/friends/' + query)
        .then(extractData)
        .then(null, console.error);
    }
  };

  return fac;
});
