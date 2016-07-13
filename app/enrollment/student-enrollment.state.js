(function (angular) {
  'use strict';
  angular
    .module('ump')
    .config(config);


  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('studentEnrollment', {
        url: '/student-enrollment/:studentId',
        templateUrl: '/app/enrollment/student-enrollment.view.html',
        controller: 'StudentEnrollmentController',
        controllerAs: 'seCtl'
      });
  }


}(angular));