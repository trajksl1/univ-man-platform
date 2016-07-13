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
      var pagination = tableState.pagination;

      var start = pagination.start || 0;
      var number = pagination.number || 10;

      var result = StudentService.getPaged(
        start,
        number,
        tableState.search.predicateObject,
        tableState.sort.predicate,
        tableState.sort.reverse
      );

      sCtl.displayed = result.data;
      tableState.pagination.numberOfPages = result.numberOfPages;
    }


    function cancelEditFn() {
      sCtl.student = {};
    }

    function addStudentFn() {
      var item = sCtl.student;
      sCtl.ListOfStudents = StudentService.addUpdateStudent(item);
      sCtl.student = {};
      sCtl.callServer(sCtl.tableCtl.tableState());


    }

    function userUpdateFn(newStd) {
      sCtl.student = {
        name: newStd.name,
        lastName: newStd.lastName,
        index: newStd.index
      };

    }

  }

}(angular));

