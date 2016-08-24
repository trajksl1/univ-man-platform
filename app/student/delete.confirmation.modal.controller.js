(function (angular) {
  'use strict';

  angular
    .module('ump')
    .controller('DeleteConfirmationModalController', DeleteConfirmationModalControllerFn);

  DeleteConfirmationModalControllerFn.$inject = ['StudentService', '$uibModalInstance', '$scope'];

  /* @ngInject */
  function DeleteConfirmationModalControllerFn(StudentService, $uibModalInstance, $scope) {
    var cdCtl = this;
    cdCtl.deleteStudent = deleteStudentFn;
  

    function deleteStudentFn() {
      StudentService.deleteStudent($scope.student.id);

      $uibModalInstance.close();

    }

  }
}(angular));

