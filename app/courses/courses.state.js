(function (angular) {
  'use strict';
  angular
    .module('ump')
    .config(config)
    .run(initialize);

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

  initialize.$inject = ['NavigationService'];

  function initialize(NavigationService) {
    NavigationService.registerPage({
      name: 'Courses',
      url: '#/course',
      state: 'course',
      order: 2
    });
  }

}(angular));