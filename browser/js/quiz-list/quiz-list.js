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
        return UserFactory.getAllUsersExceptMyself(loggedInUser);
      }
    }
  });
});

app.controller('QuizListController', function($scope, usersExceptMyself, $uibModal, $log, $document) {

  $scope.users = usersExceptMyself;
  $scope.isCollapsed = true;

  // Unfinished logic for adding friends... When/if we get to the friend logic
  // if (friends && friends.length > 0) $scope.friends = friends;

  // $scope.addFriend = function() {
  //   var modalInstance = $uibModal.open({
  //     animation: $scope.animationsEnabled,
  //     templateUrl: 'js/friends/add-friend.html',
  //     controller: 'AddFriendController',
  //     resolve: {
  //       allUsers: function(UserFactory) {
  //         return UserFactory.getAllUsersThatAreNotMyself();
  //       }
  //     }
  //   });

  //   modalInstance.result.then(function (selectedItem) {
  //     $scope.selected = selectedItem;
  //   }, function () {
  //     $log.info('Modal dismissed at: ' + new Date());
  //   });
  // };

});
