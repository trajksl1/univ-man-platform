(function (angular) {
  'use strict';

  angular
    .module('ump')
    .factory('StudentService', StudentServiceFn);

  StudentServiceFn.$inject = ['$resource', '$filter'];


  /* @ngInject */
  function StudentServiceFn($resource, $filter) {
    var studentResource = $resource('/api/student/:id', {}, {});

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

    }

    function deleteStudentFn(id) {
      studentResource.remove({id: id});

    }

    function getAllStudentsFn() {
      return studentResource.query();
    }

    function addUpdateStudentFn(item, successCallback, failureCallback) {
      studentResource.save(item, successCallback, failureCallback);
    }


  }
}

(angular));

