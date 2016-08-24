(function () {
  'use strict';

  angular
    .module('ump')
    .factory('UserService', UserServiceFn);

  UserServiceFn.$inject = ['$resource', '$filter'];

  /* @ngInject */
  function UserServiceFn($resource, $filter) {

    var userResource = $resource('/api/users/:id', {}, {
      byUsername: {
        url: '/api/users/by-username/:username',
        method: 'GET',
        isArray: false
      }
    });

    return {
      getListOfUsers: getListOfUsersFn,
      addUpdateUser: addUpdateUserFn,
      getPaged: getPagedFn,
      findByUsername: findByUsernameFn


    };

    function findByUsernameFn(username, successCallback, errorCallback) {
      return userResource.byUsername({
        username: username
      }, successCallback, errorCallback);
    }

    function getListOfUsersFn() {
      return userResource.query();

    }


    function addUpdateUserFn(item, successCallback, failureCallback) {
      userResource.save(item, successCallback, failureCallback);
    }

    function getPagedFn(start,
                        number,
                        predicateObject,
                        sortPredicate,
                        sortReverse) {

    }


  }

})();

