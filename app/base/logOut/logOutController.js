(function (angular) {
  'use strict';

  angular
    .module('ump')
    .controller('LogOutController', LogOutControllerFn);

  LogOutControllerFn.$inject = ['$rootScope', '$state'];

  /* @ngInject */
  function LogOutControllerFn($rootScope, $state) {
    var loCtl = this;
    loCtl.logOutUser = logOutUserFn;

    function logOutUserFn() {
      delete $rootScope.user;

      $state.go('login');


    }
  }

}(angular));

