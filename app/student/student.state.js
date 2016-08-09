(function (angular) {
  'use strict';
  angular
    .module('ump')
    .config(config)
    .run(initialize);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('authenticated.student', {
        url: '/student',
        templateUrl: '/app/student/student.view.html',
        controller: 'StudentController',
        controllerAs: 'sCtl'
      });
  }

  initialize.$inject = ['NavigationService'];

  function initialize(NavigationService) {
    NavigationService.registerPage({
      name: 'Students',
      url: '#/auth/student',
      state: 'authenticated.student',
      order: 1
    });
  }

}(angular));