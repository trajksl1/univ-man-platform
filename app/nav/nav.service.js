(function (angular) {
  'use strict';

  angular
    .module('ump')
    .factory('NavigationService', NavigationServiceFn);

  NavigationServiceFn.$inject = [];

  console.log('init pages')
  var pages = [];
  /* @ngInject */
  function NavigationServiceFn() {
    console.log('inisialising page')
    return {
      registerPage: registerPageFn,
      getPage: getPageFn
    };

    function registerPageFn(page) {
      pages.push(page);

    }

    function getPageFn() {
      return pages;

    }


  }

}(angular));

