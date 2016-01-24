app.factory('UserFactory', function($http) {
  var extractData = function(response) {
    return response.data;
  };

  var fac = {
    getFriends: function(user) {
      return $http.get('/api/user/' + user._id + '/friends')
        .then(extractData)
        .then(null, console.error);
    },
    getAllUsers: function() {
      return $http.get('/api/user/')
        .then(extractData)
        .then(function(users) {
          console.log(users);
        })
        .then(null, console.error);
    },
    getAllUsersExceptMyself: function(user) {
      return $http.get('/api/user/not/' + user._id)
        .then(extractData)
        .then(null, console.error);
    }
  };

  return fac;
});
