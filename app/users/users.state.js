(function (angular) {
  'use strict';
  angular
    .module('ump')
    .config(config)
    .run(initialize);

  config.$inject = ['$stateProvider', '$urlRouterProvider',];

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('users', {
        url: '/users',
        templateUrl: '/app/users/users.view.html',
        controller: 'UserController',
        controllerAs: 'aCtl'
      });
  }

  initialize.$inject = ['NavigationService'];

  function initialize(NavigationService) {
    NavigationService.registerPage({
      name: 'users',
      url: '#/users',
      state: 'users',
      order: 4
    });
  }

}(angular));