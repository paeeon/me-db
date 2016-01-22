app.config(function($stateProvider){

	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: 'js/signup/signup.html',
		controller: 'signupCtrl'
	})
})
.controller('signupCtrl', function($scope, AuthService, $state){
	$scope.signup = {
		email: null,
		password: null
	};
	$scope.error = null;

	$scope.sendSignup = function (signupInfo) {
		$scope.error = null; 

		AuthService.signup(signupInfo).then(function(){
		$state.go('home');
		}).catch(function(){
			$scope.error = 'Invalid signup credentials';
		})
	}

})