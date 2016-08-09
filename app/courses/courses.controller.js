(function (angular) {
  'use strict';

  angular
    .module('ump')
    .controller('CourseController', CourseControllerFn);

  CourseControllerFn.$inject = ['ProfessorService', 'CourseService'];

  /* @ngInject */
  function CourseControllerFn(ProfessorService, CourseService) {
    var cCtl = this;
    cCtl.title = 'Course Controller';
    cCtl.addCourse = addCourseFn;
    cCtl.listOfCourses = CourseService.getAllCourses();
    console.log(cCtl.listOfCourses);
    cCtl.listOfProfessors = ProfessorService.getAllProfessors();
    cCtl.cancelEdit = cancelEditFn;
    cCtl.displayed = [];
    cCtl.callServer = callServerFn;
    cCtl.courseUpdate = courseUpdateFn;
    cCtl.courseDelete = courseDeleteFn;
    cCtl.prerequisiteSearch = prerequisiteSearchFn;
    var signedValue = true;


    function addCourseFn() {
      var result = cCtl.course;
      CourseService.adUpdateCourse(result);
      cCtl.course = {};
      cCtl.callServer(cCtl.tableCtl.tableState(), cCtl.tableCtl);


    }

    function cancelEditFn() {
      cCtl.course = {};
    }

    cCtl.tableCtl = null;
    function callServerFn(tableState, tableCtl) {
      cCtl.tableCtl = tableCtl;
      var pagination = tableState.pagination;

      var start = pagination.start || 0;
      var number = pagination.number || 10;

      var result = CourseService.getPaged(
        start,
        number,
        tableState.search.predicateObject,
        tableState.sort.predicate,
        tableState.sort.reverse
      );

      cCtl.displayed = result.data;
      tableState.pagination.numberOfPages = result.numberOfPages;
    }

    function courseUpdateFn(item) {
      cCtl.course = {
        name: item.name,
        id: item.id,
        prerequisites: item.prerequisites,
        professors: item.professors

      };

    }

    function courseDeleteFn(course) {
      cCtl.ListOfCourse = CourseService.deleteCourse(course);
      console.log('controller deletefn');
      console.log(cCtl.ListOfCourse);
      cCtl.callServer(cCtl.tableCtl.tableState(), cCtl.tableCtl);
      return cCtl.ListOfCourse;
    }

    function prerequisiteSearchFn(v1, v2, v3) {
      console.log('custom search: ', v1, v2, v3);
    }


  }

}(angular));

