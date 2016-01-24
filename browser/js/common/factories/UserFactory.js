app.factory('UserFactory', function($http) {
	var factory = {};

	factory.getUserQuestions = function(userId) {
		return $http.get('/api/')
	}

	return factory;
})