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
      var user = UserService.findByUsername(lCtl.username);
      console.log(user);


      if (user === null || user.pass !== lCtl.password) {
        lCtl.error = "Invalid username or password";
      } else {
        $rootScope.user = user;
        $sessionStorage.user = user;
        $state.go('dashboard');
      }

      if (lCtl.remember === 'Remember') {
       $cookies.put()


      }


    }


  }

})();

