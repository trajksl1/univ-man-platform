(function (angular) {
  'use strict';

  angular
    .module('ump')
    .controller('DeleteEnrollmentConfirmationModalController', DeleteConfirmationModalControllerFn);

  DeleteConfirmationModalControllerFn.$inject = ['EnrollmentService', '$uibModalInstance', '$scope'];

  /* @ngInject */
  function DeleteConfirmationModalControllerFn(EnrollmentService, $uibModalInstance, $scope) {
    var cdCtl = this;
    cdCtl.deleteEnroll = deleteEnrollFn;
    console.log('in controller');


    function deleteEnrollFn() {
      console.log("modal delete fn");
      EnrollmentService.deleteEnroll($scope.enroll.id);
      $uibModalInstance.close();

    }

  }
}(angular));

