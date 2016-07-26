(function (angular) {
  'use strict';

  angular
    .module('ump')
    .controller('InsertGradeModalController', InsertGradeModalControllerFn);

  InsertGradeModalControllerFn.$inject = ['EnrollmentService', '$uibModalInstance', '$scope'];

  /* @ngInject */
  function InsertGradeModalControllerFn(EnrollmentService, $uibModalInstance, $scope) {
    var gCtl = this;
    gCtl.enroll = $scope.enroll;
    gCtl.grade = $scope.enroll.grade;
    gCtl.addGrade = addGradeFn;


    function addGradeFn() {
      EnrollmentService.addGrade($scope.enroll, gCtl.grade);
      $uibModalInstance.close();

    }

  }
}(angular));

