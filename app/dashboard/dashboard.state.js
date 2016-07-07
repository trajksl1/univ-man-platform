(function (angular) {
  'use strict';
  angular
    .module('ump')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: '/app/dashboard/dashboard.view.html'
      });
  }

}(angular));