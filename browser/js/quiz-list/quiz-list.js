app.config(function($stateProvider) {
  $stateProvider.state('quizList', {
    url: '/quiz/all',
    templateUrl: 'js/quiz-list/quiz-list.html',
    controller: 'QuizListController',
    resolve: {
      loggedInUser: function(AuthService) {
        if (AuthService.isAuthenticated) return AuthService.getLoggedInUser();
      },
      usersExceptMyself: function(UserFactory, loggedInUser) {
        return UserFactory.getAllUsersExceptMyself(loggedInUser._id);
      }
    }
  });
});

app.controller('QuizListController', function($scope, usersExceptMyself, $uibModal, $log, $document) {

  $scope.users = usersExceptMyself;
  $scope.isCollapsed = true;

  $scope.chooseOther = function(user) {
    $scope.selectedUser = user;
    $('.ui.basic.modal.choose-other')
      .modal('show');
  };

  $scope.playQuiz = function(subjectOfQuiz, otherUser) {
    $('.ui.basic.modal.choose-other')
      .modal('hide');
    $state.go('quiz', {subjectUserId: subjectOfQuiz._id, otherUserId: otherUser._id});
  };

});
