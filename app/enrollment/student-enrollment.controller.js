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
        var number = pagination.number || 1000;

        var result = EnrollmentService.getEnrollmentsByStudent(seCtl.student.id);
        
        seCtl.displayed = result;
        tableState.pagination.numberOfPages = 1;
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
        console.log(enroll.id);


        var modalInstance = $uibModal.open({
          scope: modalScope,
          templateUrl: 'app/enrollment/delete.confirmation.modal.template.html',
          controller: 'DeleteEnrollmentConfirmationModalController',
          controllerAs: 'cdCtl',
          size: 'lg'
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
        try {
          seCtl.message = null;
          seCtl.exeption = null;
          EnrollmentService.addUpdateEnroll(seCtl.enroll, successCallback, errorCallback);
          var result = seCtl.enroll;
          result.student = seCtl.student;
        }
        catch (ex) {
          seCtl.exeption = ex.message;
        }
      }

      function successCallback() {
        seCtl.callServer(seCtl.tableCtl.tableState(), seCtl.tableCtl);
        seCtl.enroll = {};
        seCtl.message = "enroll saved";
      }

      function errorCallback() {
        seCtl.exeption = "save- error ";
      }


    }

  }

  (angular)
);

