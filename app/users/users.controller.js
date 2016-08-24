(function (angular) {
  'use strict';

  angular
    .module('ump')
    .controller('UserController', UserControllerFn);

  UserControllerFn.$inject = ['$scope', 'UserService', 'StudentService', 'ProfessorService', 'user'];

  /* @ngInject */
  function UserControllerFn($scope, UserService, StudentService, ProfessorService, user) {
    var aCtl = this;
    aCtl.addUser = addUserFn;
    aCtl.callServer = callServerFn;
    aCtl.editUser = editUserFn;
    aCtl.listOfStudents = StudentService.getAllStudents();
    aCtl.listOfProfessors = ProfessorService.getAllProfessors();

    aCtl.listOfUsers = UserService.getListOfUsers();
    aCtl.displayed = [];

    aCtl.tableCtl = null;
    aCtl.subjects = null;

    $scope.$watch('aCtl.user.userType', function (newRole, oldRole) {
      if (newRole === oldRole || newRole === null || newRole === undefined) return;

      aCtl.subjectLabel = newRole;

      if (newRole === 'PROFESSOR') {
        aCtl.subjects = aCtl.listOfProfessors;
      } else {
        aCtl.subjects = aCtl.listOfStudents;
      }

    });

    var tableState;
    var tableCtl;


    function editUserFn(user) {
      aCtl.user = {
        id: user.id,
        username: user.username,
        userType: user.userType,
        subject: user.subject
      };
    }

    function addUserFn() {
      try {
        aCtl.exception = null;
        aCtl.message = null;
        UserService.addUpdateUser(aCtl.user, successCallback, failureCallback);

      } catch (ex) {
        aCtl.exception = ex.message;
      }

    }

    function successCallback() {
      callServerFn(tableState, tableCtl);
      aCtl.user = {};
      aCtl.message = "The user is saved successfully :)"
    }

    function failureCallback() {
      aCtl.exception = 'Save error!';
    }


    function callServerFn(ts, tctl) {
      tableState = ts;
      tableCtl = tctl;

      var pagination = tableState.pagination;

      var start = pagination.start || 0;
      var number = pagination.number || 1000;

      var result = UserService.getListOfUsers();

      aCtl.displayed = result;
      tableState.pagination.numberOfPages = 1;

    }

  }

}(angular));

