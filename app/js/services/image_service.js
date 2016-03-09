module.exports = function(app) {
  app.factory('ImageService', ['$http', function($http) {
    return {
      baseUrl: 'http://localhost:8081/api/images',
      get: function() {
        return $http.get(this.baseUrl);
      },
      post: function(postData) {
        return $http.post(this.baseUrl, postData);
      }
    };
  }]);
};
