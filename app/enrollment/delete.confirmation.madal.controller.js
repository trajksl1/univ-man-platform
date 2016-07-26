(function (angular) {
  'use strict';

  angular
    .module('ump')
    .controller('DeleteConfirmationModalController', DeleteConfirmationModalControllerFn);

  DeleteConfirmationModalControllerFn.$inject = ['EnrollmentService', '$uibModalInstance', '$scope'];

  /* @ngInject */
  function DeleteConfirmationModalControllerFn(EnrollmentService, $uibModalInstance, $scope) {
    var cdCtl = this;
    cdCtl.deleteEnroll = deleteEnrollFn;


    function deleteEnrollFn() {
      EnrollmentService.deleteEnroll($scope.enroll);
      $uibModalInstance.close();

    }

  }
}(angular));

