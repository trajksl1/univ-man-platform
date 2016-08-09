(function (angular) {
  'use strict';
  angular
    .module('ump')
    .config(config)
    .run(initialize);

  config.$inject = ['$stateProvider', '$urlRouterProvider',];

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('authenticated.users', {
        url: '/users',
        templateUrl: '/app/users/users.view.html',
        controller: 'UserController',
        controllerAs: 'aCtl'
      });
    console.log('registered users')
  }

  initialize.$inject = ['NavigationService'];

  function initialize(NavigationService) {
    NavigationService.registerPage({
      name: 'users',
      url: '#/auth/users',
      state: 'authenticated.users',
      order: 4
    });
  }

}(angular));