const angular = require('angular');

describe('Home controller', () => {
  var $httpBackend, $scope, $ControllerConstructor;

  beforeEach(angular.mock.module('imgrrApp'));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to construct a controller', () => {
    var homeController = $ControllerConstructor('HomeController', {$scope});
    expect(typeof homeController).toBe('object');
    expect($scope.images instanceof Array).toBe(true);
  });

  describe('HTTP requests', () => {
    this.baseUrl = 'http://localhost:8081/api/images';

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('HomeController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to load all images', () => {
      $httpBackend.expectGET(this.baseUrl)
        .respond(200, [{ caption: 'some image' }]);

      $scope.images = [];
      $scope.loadAll();
      $httpBackend.flush();

      expect($scope.images.length).toBe(1);
      expect($scope.images[0].caption).toBe('some image');
    });

    it('should be able to submit a new image', () => {
      var reqData = { caption: 'request caption' };
      var resData = { caption: 'response caption' };

      $httpBackend.expectPOST(this.baseUrl, reqData)
        .respond(200, resData);

      $scope.images = [];
      $scope.newImage = { caption: 'new image caption' };
      $scope.postNew(reqData);
      $httpBackend.flush();

      expect($scope.images.length).toBe(1);
      expect($scope.images[0].caption).toBe('response caption');
      expect($scope.newImage).toBe(null);
    });
  });
});
