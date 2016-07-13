(function (angular) {
  'use strict';
  angular
    .module('ump')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('student', {
        url: '/student',
        templateUrl: '/app/student/student.view.html',
        controller: 'StudentController',
        controllerAs: 'sCtl'
      });
  }

}(angular));