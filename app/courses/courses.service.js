(function (angular) {
  'use strict';

  angular
    .module('ump')
    .factory('CourseLocalService', CourseServiceFn);

  CourseServiceFn.$inject = ['$localStorage', '$filter'];

  /* @ngInject */
  function CourseServiceFn($localStorage, $filter) {
    return {
      getAllCourses: getAllCoursesFn,
      adUpdateCourse: adUpdateCourseFn,
      getPaged: getPagedFn,
      findCourse: findCourseFn,
      deleteCourse: deleteCourseFn,


    };


    function getPagedFn(start,
                        number,
                        predicateObject,
                        sortPredicate,
                        sortReverse) {
      var filtered = predicateObject ?
        $filter('filter')($localStorage.listOfCourses, predicateObject) :
        $localStorage.listOfCourses;

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


    function getAllCoursesFn() {
      return $localStorage.listOfCourses;
    }

    function initStageFn() {
      if ($localStorage.listOfCourses === undefined || $localStorage.listOfCourses === null)
        $localStorage.listOfCourses = [];

    }

    function findCourseFn(index) {
      var result = null;
      angular.forEach($localStorage.listOfCourses, function (e) {
        if (e.id === index)
          result = e;
      });
      return result;

    }

    function updateCourseFn(course, newCourse) {

      course.name = newCourse.name;
      course.id = newCourse.id;
      course.prerequisites = newCourse.prerequisites;
      course.professors = newCourse.professors;

    }

    function adUpdateCourseFn(item) {
      
      initStageFn();
      var course = findCourseFn(item.id);
      if (course === null) {
        $localStorage.listOfCourses.push(item);
      }
      else {
        updateCourseFn(course, item);
      }

      return $localStorage.listOfCourses;

    }

    function deleteCourseFn(course) {
      var index = $localStorage.listOfCourses.indexOf(course);
      if (index !== -1) {
        $localStorage.listOfCourses.splice(index, 1);
      }
      console.log($localStorage.listOfCourses);
      console.log('service deletefn');
      return $localStorage.listOfCourses;


    }

  }

}(angular));

