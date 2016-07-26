(function (angular) {
  'use strict';

  angular
    .module('ump')
    .controller('UserController', UserControllerFn);

  UserControllerFn.$inject = ['$scope', 'UserService', 'StudentService', 'ProfessorService'];

  /* @ngInject */
  function UserControllerFn($scope, UserService, StudentService, ProfessorService) {
    var aCtl = this;
    aCtl.addUser = addUserFn;
    aCtl.callServer = callServerFn;
    aCtl.editUser = editUserFn;
    aCtl.listOfStudents = StudentService.getAllStudents();
    aCtl.listOfProfessors = ProfessorService.getAllProfessors();

    aCtl.subjects = null;

    $scope.$watch('aCtl.user.role', function (newRole, oldRole) {
      if (newRole === oldRole || newRole === null || newRole === undefined) return;

      aCtl.subjectLabel = newRole;

      if (newRole === 'Professor') {
        aCtl.subjects = aCtl.listOfProfessors;
      } else {
        aCtl.subjects = aCtl.listOfStudents;
      }

    });

    aCtl.listOfUsers = UserService.getListOfUsers();
    aCtl.displayed = [];
    var tableState;
    var tableCtl;


    function editUserFn(user) {
      aCtl.user = {
        username: user.username,
        role: user.role,
        subject: user.subject,
        $saved: user.$saved // this should always be true here
      };
    }

    function addUserFn() {
      try {
        aCtl.exception = null;
        aCtl.message = null;
        var result = aCtl.user;
        UserService.addUpdateUser(result);
        aCtl.user = {};
        callServerFn(tableState, tableCtl)
        aCtl.message = "The user is saved successfully :)"
      } catch (ex) {
        aCtl.exception = ex.message;
      }

    }

    aCtl.tableCtl = null;
    function callServerFn(ts, tctl) {
      tableState = ts;
      tableCtl = tctl;

      var pagination = tableState.pagination;

      var start = pagination.start || 0;
      var number = pagination.number || 10;

      var result = UserService.getPaged(
        start,
        number,
        tableState.search.predicateObject,
        tableState.sort.predicate,
        tableState.sort.reverse
      );

      aCtl.displayed = result.data;
      tableState.pagination.numberOfPages = result.numberOfPages;
    }

  }

}(angular));

