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
      },
      friends: function(UserFactory, loggedInUser) {
        return UserFactory.getAllFriendsOf(loggedInUser._id);
      }
    }
  });
});

app.controller('QuizListController', function($scope, $state, loggedInUser, friends, UserFactory) {

  if (friends && friends.length > 0) {
    $scope.friends = friends;
  } else {
    $scope.friends = null;
  }

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

  $scope.getAllPotentialFriendsThatMatchThisQuery = function(query) {
    // Query is what the user types into the searchbox
    UserFactory.getAllPotentialFriendsThatMatchThisQuery(loggedInUser._id, query)
      .then(function(potentialFriends) {
        console.log(potentialFriends);
      }).then(null, console.error);
  };

});
