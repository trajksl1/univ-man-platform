(function (angular) {
  'use strict';

  angular
    .module('ump')
    .controller('StudentController', StudentControllerFn);

  StudentControllerFn.$inject = ['StudentService', '$uibModal', '$scope'];

  /* @ngInject */
  function StudentControllerFn(StudentService, $uibModal, $scope) {
    var sCtl = this;
    sCtl.displayed = [];
    sCtl.title = 'Student Controller';
    sCtl.cancelEdit = cancelEditFn;
    sCtl.addStudent = addStudentFn;
    sCtl.ListOfStudents = StudentService.getAllStudents;
    sCtl.userUpdate = userUpdateFn;
    sCtl.callServer = callServerFn;
    sCtl.openConfirmationModal = openConfirmationModalFn;


    function openConfirmationModalFn(student) {
      var modalScope = $scope.$new(true);
      modalScope.student = student;
      var modalInstance = $uibModal.open({
        scope: modalScope,
        templateUrl: 'app/student/delete.confirmation.modal.template.html',
        controller: 'DeleteConfirmationModalController',
        controllerAs: 'cdCtl',
        size: 'lg',

      });

      modalInstance.result.then(function () {
        sCtl.ListOfStudents = StudentService.getAllStudents();
        sCtl.callServer(sCtl.tableCtl.tableState(), sCtl.tableCtl);
      });


    }


    sCtl.tableCtl = null;
    function callServerFn(tableState, tableCtl) {
      sCtl.tableCtl = tableCtl;
      sCtl.tableState=tableState;
      var pagination = tableState.pagination;

      var start = pagination.start || 0;
      var number = pagination.number || 1000;

      var result = StudentService.getAllStudents();

      sCtl.displayed = result;
      tableState.pagination.numberOfPages = 1;
    }


    function cancelEditFn() {
      sCtl.student = {};
    }

    function addStudentFn() {
      try {
        sCtl.message = null;
        sCtl.exception = null;
        StudentService.addUpdateStudent(sCtl.student, successCallback, failureCallback)
      } catch (ex) {
        sCtl.exception = ex.message;
      }

    }

    function successCallback() {
      sCtl.callServer(sCtl.tableState, sCtl.tableCtl);
      sCtl.student = {};
      sCtl.message = "Saved";
    }

    function failureCallback() {
      sCtl.exception = 'Save error!';

    }

    function userUpdateFn(newStd) {
      sCtl.student = {
        id: newStd.id,
        name: newStd.name,
        lastName: newStd.lastName,
        index: newStd.index
      };

    }

  }

}(angular));

