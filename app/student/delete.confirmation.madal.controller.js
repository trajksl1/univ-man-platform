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
    console.log($scope.student);

    function deleteStudentFn() {
      StudentService.deleteStudent($scope.student);
      $uibModalInstance.close();

    }

  }
}(angular));

