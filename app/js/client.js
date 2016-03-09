const angular = require('angular');
const imgrrApp = angular.module('imgrrApp', []);

require('./services/image_service')(imgrrApp);
require('./controllers/home_controller')(imgrrApp);
require('./directives/submission_form_directive')(imgrrApp);
require('./directives/image_display_directive')(imgrrApp);
