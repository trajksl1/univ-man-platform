(function (angular) {
  'use strict';

  angular
    .module('ump')
    .controller('StudentEnrollmentController', StudentEnrollmentControllerFn);

  StudentEnrollmentControllerFn.$inject = ['$stateParams'];

  /* @ngInject */
  function StudentEnrollmentControllerFn($stateParams) {
    var seCtl = this;
    seCtl.id = $stateParams.studentId;


  }

}(angular));

