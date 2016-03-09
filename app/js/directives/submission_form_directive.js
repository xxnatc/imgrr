module.exports = function(app) {
  app.directive('submissionForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: '/templates/submission_form_directive.html',
      scope: {
        formSubmit: '&',
        newImage: '='
      },
      controller: function($scope) {
        $scope.newImage = $scope.newImage;
      }
    };
  });
};
