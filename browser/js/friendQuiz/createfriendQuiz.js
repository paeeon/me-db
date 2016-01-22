app.config(function($stateProvider) {
  $stateProvider.state('createfriendQuiz', {
    url: '/friend-quiz/create',
    templateUrl: 'js/createFriendQuiz/createFriendQuiz.html',
    controller: 'CreateFriendQuizController'
  });
});

app.controller('CreateFriendQuizController', function($scope) {

});
