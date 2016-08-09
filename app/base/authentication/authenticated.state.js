(function (angular) {
  'use strict';
  angular
    .module('ump')
    .config(config)
    .run(runFn);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('authenticated', {
        abstract: true,
        url: '/auth',
        templateUrl: '/app/base/authentication/auth.view.html',
        resolve: {
          user: resolveUserFn
        }
      });
  }

  resolveUserFn.$inject = ['$q', '$timeout', '$rootScope', '$sessionStorage', '$cookieStore', '$state'];

  function resolveUserFn($q, $timeout, $rootScope, $sessionStorage, $cookieStore, $state) {
    var deferred = $q.defer();

    // $timeout is an example; it also can be an xhr request or any other async function
    $timeout(function () {
      var usr = getUser($rootScope, $sessionStorage, $cookieStore);

      if (usr !== undefined) {
        // everything is fine, proceed
        $rootScope.user = usr;
        deferred.resolve(usr);
      } else {
        // user is not logged, do not proceed
        // instead, go to a different page
        $state.go('login');
        deferred.reject();
      }
    });

    return deferred.promise;
  }


  function getUser($rootScope, $sessionStorage, $cookieStorage) {
    if ($rootScope.user !== undefined) {
      return $rootScope.user;
    }
    if ($sessionStorage.user !== undefined) {
      return $sessionStorage.user;
    }
    if ($cookieStorage.user !== undefined) {
      return $cookieStorage.user;
    }
    return undefined;
  }

// runFn e za userName +LastName vo navBar da se prikazat posle najava na user.
  runFn.$inject = ['$rootScope', '$sessionStorage', '$cookieStore'];
  function runFn($rootScope, $sessionStorage, $cookieStore) {
    var usr = getUser($rootScope, $sessionStorage, $cookieStore);
    return $rootScope.usr;


  }


}(angular));