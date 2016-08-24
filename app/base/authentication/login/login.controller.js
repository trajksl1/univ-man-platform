(function () {
  'use strict';

  angular
    .module('ump')
    .controller('LoginController', LoginControllerFn);

  LoginControllerFn.$inject = ['$rootScope', '$state', '$sessionStorage', 'UserService', '$cookies'];

  /* @ngInject */
  function LoginControllerFn($rootScope, $state, $sessionStorage, UserService, $cookies) {
    var lCtl = this;


    lCtl.login = loginFn;

    function loginFn() {
      lCtl.error = null;
      UserService.findByUsername(lCtl.username, successCallback, errorCallback);

      function successCallback(user) {

        if (user === null || user.password !== lCtl.password) {
          lCtl.error = "Invalid username or password";
        } else {
          $rootScope.user = user;
          $sessionStorage.user = user;
          $state.go('dashboard');
        }
      }

      function errorCallback() {
        lCtl.error = "Invalid username or password";
      }


      if (lCtl.remember === 'Remember') {
       $cookies.put()


      }


    }


  }

})();

