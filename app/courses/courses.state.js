(function (angular) {
  'use strict';
  angular
    .module('ump')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('course', {
        url: '/course',
        templateUrl: '/app/courses/courses.view.html',
        controller: 'CourseController',
        controllerAs: 'cCtl'
      });
  }

}(angular));