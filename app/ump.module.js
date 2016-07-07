(function(angular) {
  'use strict';
  angular
    .module('ump', [
      'ui.router',
      'ui.select',
      'smart-table',
      'ngResource',
      'ngSanitize',
      'ui.bootstrap',       
      'ui.bootstrap.datetimepicker',
      'ngStorage',
      'pascalprecht.translate',
      'toastr'
    ])
    .config(config)
    .run(run);

  config.$inject = ['$urlRouterProvider'];
  run.$inject = ['$rootScope'];

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
  }


  function run($rootScope) {
    $rootScope.appName = 'UMP';

  }

}(angular));
