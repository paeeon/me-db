app.controller('AddFriendController', function($scope, allUsers, $uibModalInstance) {
  $scope.allUsers = allUsers;
  console.log(allUsers);

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
