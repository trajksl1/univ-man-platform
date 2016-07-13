(function (angular) {
  'use strict';
  angular
    .module('ump')
    .config(config)
    .run(initialize);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('professor', {
        url: '/professor',
        templateUrl: '/app/professor/professor.view.html',
        controller: 'ProfessorController',
        controllerAs: 'pCtl'
      });
  }
  
  initialize.$inject=[];
  
  function initialize(){
    
  }

}(angular));