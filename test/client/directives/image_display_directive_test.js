const angular = require('angular');
const templateUrl = '/templates/image_display_directive.html';
const template = require(__dirname + '/../../../app/templates/image_display_directive.html');

describe('Image display directive', () => {
  var $compile, $rootScope, $httpBackend;

  beforeEach(angular.mock.module('imgrrApp'));
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should be able to load and render data', () => {
    $httpBackend.whenGET(templateUrl)
      .respond(200, template);

    var element = $compile('<image-display data-image-data="{caption:\'test caption\'}"></image-display>')($rootScope);

    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('test caption');
  });

  it('should able to load and render from scope', () => {
    var testScope = $rootScope.$new();
    $httpBackend.whenGET(templateUrl)
      .respond(200, template);

    testScope.testImage = { caption: 'from scope' };
    var element = $compile('<image-display data-image-data=testImage></image-display>')(testScope);

    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('from scope');
  });
});
