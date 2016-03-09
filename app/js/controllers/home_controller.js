module.exports = function(app) {
  app.controller('HomeController', ['$scope', 'ImageService', function($scope, ImageService) {
    $scope.images = [];
    $scope.newImage = null;

    $scope.loadAll = function() {
      ImageService.get()
        .then(function(res) {
          $scope.images = res.data;
        }, function(err) {
          console.log('There was an error loading the images');
        });
    };

    $scope.postNew = function(postData) {
      ImageService.post(postData)
        .then(function(res) {
          $scope.images.push(res.data);
          $scope.newImage = null;
        }, function(err) {
          console.log('There was an error posting your image');
        });
    };
  }]);
};
