(function (angular) {
    'use strict';

    angular
      .module('ump')
      .factory('EnrollmentLocalService', EnrollmentServiceFn);

    EnrollmentServiceFn.$inject = ['$localStorage'];

    /* @ngInject */
    function EnrollmentServiceFn($localStorage) {
      return {
        findStudent: findStudentFn,
        addUpdateEnroll: addUpdateEnrollFn,
        getAllEnrollments: getAllEnrollmentsFn,
        getPaged: getPagedFn,
        deleteEnroll: deleteEnrollFn,
        addGrade: addGradeFn
      };
      function deleteEnrollFn(enroll) {
        var index = $localStorage.listOfEnrollments.indexOf(enroll);
        if (index !== -1) {
          $localStorage.listOfEnrollments.splice(index, 1)
        }
        return $localStorage.listOfEnrollments;
      }

      function getPagedFn(start,
                          number,
                          predicateObject,
                          sortPredicate,
                          sortReverse) {

        var filtered = predicateObject ?
          $filter('filter')($localStorage.listOfEnrollments, predicateObject) :
          $localStorage.listOfEnrollments;

        if (sortPredicate) {
          filtered = $filter('orderBy')(filtered, sortPredicate, sortReverse);

        }

        var result = filtered.slice(start, start + number);
        var numberOfPages = Math.ceil(filtered.length / number);

        return {
          data: result,
          numberOfPages: numberOfPages
        };


      }

      function getAllEnrollmentsFn() {
        return $localStorage.listOfEnrollments;

      }

      function findStudentFn(item) {
        var result = null;
        angular.forEach($localStorage.ListOfStudents, function (e) {
          if (e.index === item) {
            result = e;
          }
        });
        return result;
      }

      function initStageFn() {
        if ($localStorage.listOfEnrollments === null || $localStorage.listOfEnrollments === undefined)
          $localStorage.listOfEnrollments = [];

      }


      function existingEnrollFn(enroll) {
        var result = false;
        angular.forEach($localStorage.listOfEnrollments, function (e) {
          if (e.course === enroll.course && e.professor === enroll.professor)
            result = true;
        });
        return result;

      }

      function addGradeFn(enroll, grade) {
        enroll.grade = grade;
      }


      function addUpdateEnrollFn(item) {
        initStageFn();
        var enroll = item;
        var check = existingEnrollFn(item);
        if (check === false) {
          $localStorage.listOfEnrollments.push(item);
        }

        return $localStorage.listOfEnrollments;


      }


    }

  }
  (angular)
)
;

