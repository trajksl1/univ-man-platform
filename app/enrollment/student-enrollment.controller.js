(function (angular) {
    'use strict';

    angular
      .module('ump')
      .controller('StudentEnrollmentController', StudentEnrollmentControllerFn);

    StudentEnrollmentControllerFn.$inject = ['$stateParams', 'StudentService', 'EnrollmentService', 'CourseService', '$uibModal', '$scope'];

    /* @ngInject */
    function StudentEnrollmentControllerFn($stateParams, StudentService, EnrollmentService, CourseService, $uibModal, $scope) {
      var seCtl = this;
      seCtl.id = $stateParams.studentId;
      seCtl.student = EnrollmentService.findStudent(seCtl.id);
      seCtl.ListOfStudents = StudentService.getAllStudents;
      seCtl.listOfCourses = CourseService.getAllCourses();
      seCtl.cancelEdit = cancelEditFn;
      seCtl.addEnrollment = addEnrollmentFn;
      seCtl.listOfEnrollments = EnrollmentService.getAllEnrollments();
      seCtl.callServer = callServerFn;
      seCtl.displayed = [];
      seCtl.openGradeModal = openGradeModalFn;
      seCtl.openConfirmationModal = openConfirmationModalFn;

      seCtl.tableCtl = null;
      function callServerFn(tableState, tableCtl) {
        seCtl.tableCtl = tableCtl;
        var pagination = tableState.pagination;

        var start = pagination.start || 0;
        var number = pagination.number || 10;

        var result = EnrollmentService.getPaged(
          start,
          number,
          tableState.search.predicateObject,
          tableState.sort.predicate,
          tableState.sort.reverse
        );

        seCtl.displayed = result.data;
        tableState.pagination.numberOfPages = result.numberOfPages;
      }

      function openGradeModalFn(enroll) {
        var modalScope = $scope.$new(true);
        modalScope.enroll = enroll;
        var modalInstance = $uibModal.open({
          scope: modalScope,
          templateUrl: '/app/enrollment/insert.grade.modal.template.html',
          controller: 'InsertGradeModalController',
          controllerAs: 'gCtl',
          size: 'lg'
        });

        modalInstance.result.then(function () {

          seCtl.listOfEnrollments = EnrollmentService.getAllEnrollments();
          seCtl.callServer(seCtl.tableCtl.tableState(), seCtl.tableCtl);
        });
      }

      function openConfirmationModalFn(enroll) {
        var modalScope = $scope.$new(true);
        modalScope.enroll = enroll;
        var modalInstance = $uibModal.open({
          scope: modalScope,
          templateUrl: 'app/enrollment/delete.confirmation.modal.template.html',
          controller: 'DeleteConfirmationModalController',
          controllerAs: 'cdCtl',
          size: 'lg',

        });

        modalInstance.result.then(function () {
          seCtl.listOfEnrollments = EnrollmentService.getAllEnrollments();
          seCtl.callServer(seCtl.tableCtl.tableState(), seCtl.tableCtl);
        });

      }


      function cancelEditFn() {
        seCtl.enroll = {};

      }

      function addEnrollmentFn() {
        var result = seCtl.enroll;
        result.student = seCtl.student;
        EnrollmentService.addUpdateEnroll(result);
        seCtl.enroll = {};
        seCtl.callServer(seCtl.tableCtl.tableState(), seCtl.tableCtl);

      }


    }

  }

  (angular)
);

