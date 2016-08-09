(function (angular) {
  'use strict';
  angular
    .module('ump')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider',];

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: '/app/base/authentication/login/login.view.html',
        controller: 'LoginController',
        controllerAs: 'lCtl'
      });
  }

}(angular));