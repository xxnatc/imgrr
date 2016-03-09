const angular = require('angular');

describe('Image service', () => {
  var $httpBackend, ImageService;

  beforeEach(angular.mock.module('imgrrApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_, _ImageService_) {
    $httpBackend = _$httpBackend_;
    ImageService = _ImageService_;
  }));

  it('should be a singleton service', () => {
    expect(typeof ImageService).toBe('object');
    expect(ImageService.baseUrl).toBe('http://localhost:8081/api/images');
  });

  describe('methods with HTTP requests', () => {
    this.baseUrl = 'http://localhost:8081/api/images';

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to handle an error', () => {
      $httpBackend.expectGET(this.baseUrl)
        .respond(400);

      var called = false;
      ImageService.get().catch((err) => {
        expect(typeof err).toBe('object');
        called = true;
      });
      $httpBackend.flush();

      expect(called).toBe(true);
    });

    it('should be able to make a GET request', () => {
      $httpBackend.expectGET(this.baseUrl)
        .respond(200, [{ caption: 'some caption' }]);

      var called = false;
      ImageService.get().then((res) => {
        expect(res.data.length).toBe(1);
        expect(res.data[0].caption).toBe('some caption');
        called = true;
      });
      $httpBackend.flush();

      expect(called).toBe(true);
    });

    it('should be able to make a POST request', () => {
      var reqData = { caption: 'request caption' };
      var resData = { caption: 'response caption' };

      $httpBackend.expectPOST(this.baseUrl, reqData)
        .respond(200, resData);

      var called = false;
      ImageService.post(reqData).then((res) => {
        expect(res.status).toBe(200);
        expect(res.data.caption).toBe('response caption');
        called = true;
      });
      $httpBackend.flush();

      expect(called).toBe(true);
    });
  });
});
