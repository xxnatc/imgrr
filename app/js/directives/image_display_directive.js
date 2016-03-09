module.exports = function(app) {
  app.directive('imageDisplay', function() {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: '/templates/image_display_directive.html',
      scope: {
        imageData: '='
      },
      controller: function($scope) {
        $scope.imageData = $scope.imageData;
      }
    };
  });
};
