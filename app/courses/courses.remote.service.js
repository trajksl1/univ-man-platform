(function (angular) {
  'use strict';

  angular
    .module('ump')
    .factory('CourseService', CourseServiceFn);

  CourseServiceFn.$inject = ['$resource', '$filter'];

  /* @ngInject */
  function CourseServiceFn($resource, $filter) {
    var courseResource = $resource('/api/course/:id', {}, {});

    return {
      getAllCourses: getAllCoursesFn,
      addUpdateCourse: addUpdateCourseFn,
      getPaged: getPagedFn,
      findCourse: findCourseFn,
      deleteCourse: deleteCourseFn
    };


    function getPagedFn(start,
                        number,
                        predicateObject,
                        sortPredicate,
                        sortReverse) {


    }


    function getAllCoursesFn() {
      return courseResource.query();
    }


    function findCourseFn(id) {
      return courseResource.get({id: id});
    }


    function addUpdateCourseFn(course, successCallback, errorCallback) {
      console.log('service add course')
      courseResource.save(course, successCallback, errorCallback);
    }

    function deleteCourseFn(id) {
      courseResource.delete(id);


    }

  }

}(angular));

