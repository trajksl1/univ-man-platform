(function (angular) {
  'use strict';
  angular
    .module('ump')
    .config(config)
    .run(initialize);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('authenticated.professor', {
        url: '/professor',
        templateUrl: '/app/professor/professor.view.html',
        controller: 'ProfessorController',
        controllerAs: 'pCtl'
      });
  }

  initialize.$inject = ['NavigationService'];

  function initialize(NavigationService) {
    NavigationService.registerPage({
      name: 'Professors',
      url: '#/auth/professor',
      state: 'authenticated.professor',
      order: 3
    });
  }

}(angular));