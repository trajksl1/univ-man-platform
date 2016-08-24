(function (angular) {
  'use strict';

  angular
    .module('ump')
    .factory('StudentLocalService', StudentServiceFn);

  StudentServiceFn.$inject = ['$localStorage', '$filter'];

  /* @ngInject */
  function StudentServiceFn($localStorage, $filter) {
    return {
      addUpdateStudent: addUpdateStudentFn,
      getAllStudents: getAllStudentsFn,
      deleteStudent: deleteStudentFn,
      getPaged: getPagedFn

    };
    function getPagedFn(start,
                        number,
                        predicateObject,
                        sortPredicate,
                        sortReverse) {
      var filtered = predicateObject ?
        $filter('filter')($localStorage.ListOfStudents, predicateObject) :
        $localStorage.ListOfStudents;

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

    function deleteStudentFn(student) {
      var index = $localStorage.ListOfStudents.indexOf(student);
      if (index !== -1) {
        $localStorage.ListOfStudents.splice(index, 1)
      }
      return $localStorage.ListOfStudents;
    }

    function getAllStudentsFn() {
      return $localStorage.ListOfStudents;
    }

    function initStorage() {
      if ($localStorage.ListOfStudents === undefined || $localStorage.ListOfStudents === null) {
        $localStorage.ListOfStudents = [];
      }

    }

    function findStudent(index) {
      var result = null;
      angular.forEach($localStorage.ListOfStudents, function (e) {
        if (e.index === index) {
          result = e;
        }
      });
      return result;
    }

    function updateStudent(student, newStd) {
      console.log(student);
      student.name = newStd.name;
      student.lastName = newStd.lastName;
      student.index = newStd.index;


    }

    function addUpdateStudentFn(item) {
      initStorage();
      var student = findStudent(item.index);
      if (student === null) {
        $localStorage.ListOfStudents.push(item);
      }
      else {
        updateStudent(student, item);
      }
      return $localStorage.ListOfStudents;
    }


  }
}

(angular));

