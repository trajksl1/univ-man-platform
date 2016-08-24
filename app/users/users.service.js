(function () {
  'use strict';

  angular
    .module('ump')
    .factory('LocalUserService', UserServiceFn);

  UserServiceFn.$inject = ['$localStorage', '$filter'];

  /* @ngInject */
  function UserServiceFn($localStorage, $filter) {

    return {
      getListOfUsers: getListOfUsersFn,
      addUpdateUser: addUpdateUserFn,
      getPaged: getPagedFn,
      findByUsername: findByUsernameFn


    };

    function findByUsernameFn(username) {
      var user = existingUserFn({
        username: username
      });
      if (user === false) {
        return null;
      } else {
        return user;
      }
    }

    function getListOfUsersFn() {
      return $localStorage.listOfUsers;

    }

    function initStorage() {
      if ($localStorage.listOfUsers === null || $localStorage.listOfUsers === undefined)
        $localStorage.listOfUsers = [];
    }

    function existingUserFn(user) {
      var result = false;
      angular.forEach($localStorage.listOfUsers, function (e) {
        if (e.username === user.username) {
          result = e;
        }
      });

      return result;

    }


    function addUpdateUserFn(item) {
      initStorage();
      var user = existingUserFn(item);
      if (item.$saved === true) {
        // update existing user
        if (user === false) {
          throw({message: 'Can\'t update user. The username is invalid!'});
        } else {
          user.password = item.password;
          user.subject = item.subject;
          user.role = item.role;
        }
      } else {
        // create new user
        if (user === false) {
          item.$saved = true;
          $localStorage.listOfUsers.push(item);
        } else {
          throw({message: 'Can\'t insert user. Duplicate username!'});
        }
      }

      /*  else {
       changePassword(result, user.pass)
       }*/
      return $localStorage.listOfUsers;

    }

    function getPagedFn(start,
                        number,
                        predicateObject,
                        sortPredicate,
                        sortReverse) {
      initStorage();
      var filtered = predicateObject ?
        $filter('filter')($localStorage.listOfUsers, predicateObject) :
        $localStorage.listOfUsers;

      if (sortPredicate) {
        filtered = $filter('orderBy')(filtered, sortPredicate, sortReverse);

      }

      var result = filtered.slice(start, start + number);
      var numberOfPages = Math.ceil(filtered.length / number);

      return {
        data: result,
        numberOfPages: numberOfPages
      };


    }


  }

})();

