(function (angular) {
    'use strict';

    angular
      .module('ump')
      .factory('EnrollmentService', EnrollmentServiceFn);

    EnrollmentServiceFn.$inject = ['$resource'];

    /* @ngInject */
    function EnrollmentServiceFn($resource) {
      var enrollmentResource = $resource('/api/enroll/:id', {}, {
        getEnrollmentsByStudent: {
          url: '/api/enroll/by-student/:id',
          method: 'GET',
          isArray: true
        },
        addGradeToEnroll: {
          url: '/api/enroll/add-grade/:id',
          method: 'POST',
          isArray: false
        }
      });
      var studentResource = $resource('/api/student/:id', {}, {
        byId: {
          url: '/api/student/by-id/:id',
          method: 'GET',
          isArray: false
        }
      });
      return {
        findStudent: findStudentFn,
        addUpdateEnroll: addUpdateEnrollFn,
        getAllEnrollments: getAllEnrollmentsFn,
        getPaged: getPagedFn,
        deleteEnroll: deleteEnrollFn,
        addGrade: addGradeFn,
        findEnrollById: findEnrollByIdFn,
        getEnrollmentsByStudent: getEnrollmentsByStudentFn
      };

      function getEnrollmentsByStudentFn(id, successCallback, errorCallback) {
        return enrollmentResource.getEnrollmentsByStudent(
          {id: id}, successCallback, errorCallback);

      }

      function deleteEnrollFn(id) {
        enrollmentResource.remove({id: id});

      }

      function findEnrollByIdFn(id) {
        return enrollmentResource.get({id: id});

      }

      function getPagedFn(start,
                          number,
                          predicateObject,
                          sortPredicate,
                          sortReverse) {


      }

      function getAllEnrollmentsFn() {
        return enrollmentResource.query();

      }

      function findStudentFn(id) {
        return studentResource.get({
          id: id
        });

      }

      function addGradeFn(id, grade) {
        console.log(id)
        return enrollmentResource.addGradeToEnroll({id: id, grade: grade}, {id: id});
      }


      function addUpdateEnrollFn(item, successCallback, errorCallback) {
        enrollmentResource.save(item, successCallback, errorCallback)
      }


    }

  }
  (angular)
)
;

