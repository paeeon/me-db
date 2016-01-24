app.config(function($stateProvider) {
  $stateProvider.state('quiz', {
    url: '/quiz/:userId',
    templateUrl: 'js/quiz/quiz.html',
    controller: 'QuizController',
    resolve: {
      loggedInUser: function(AuthService) {
        if (AuthService.isAuthenticated) return AuthService.getLoggedInUser();
      },
      userToTakeQuizOn: function($stateParams, AnswerFactory) {
        return AnswerFactory.getAnswersByUserWithQuestion($stateParams.userId);
      }
    }
  });
});

app.controller('QuizController', function($scope, usersExceptMyself) {

});
