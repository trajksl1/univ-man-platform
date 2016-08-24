(function (angular) {
  'use strict';
  angular
    .module('ump')
    .config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider',];

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('calendar', {
        url: '/calendar',
        templateUrl: '/app/calendar-exemple/calendar.view.html',
        controller: 'CalendarController',
        controllerAs: 'caCtl'
      });
  }


}(angular));