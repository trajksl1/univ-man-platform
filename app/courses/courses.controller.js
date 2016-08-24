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
    cCtl.listOfProfessors = ProfessorService.getAllProfessors();
    cCtl.cancelEdit = cancelEditFn;
    cCtl.displayed = [];
    cCtl.callServer = callServerFn;
    cCtl.courseUpdate = courseUpdateFn;
    cCtl.courseDelete = courseDeleteFn;
    cCtl.prerequisiteSearch = prerequisiteSearchFn;
    var signedValue = true;


    function addCourseFn() {

      try {
        cCtl.exeption = null;
        cCtl.message = null;
        console.log('controller add')
        CourseService.addUpdateCourse(cCtl.course, successCallback, failureCallback);

      }
      catch (ex) {
        cCtl.exeption = ex.message;
      }
    }

    function successCallback() {
      callServerFn(cCtl.tableCtl.tableState(), cCtl.tableCtl);
      cCtl.course = {};
      cCtl.message = "The course is saved successfully :)"
    }

    function failureCallback() {
      cCtl.exception = 'Save error!';
    }

    function cancelEditFn() {
      cCtl.course = {};
    }

    cCtl.tableCtl = null;
    function callServerFn(tableState, tableCtl) {
      cCtl.tableCtl = tableCtl;
      var pagination = tableState.pagination;

      var start = pagination.start || 0;
      var number = pagination.number || 1000;

      var result = CourseService.getAllCourses();

      cCtl.displayed = result;
      tableState.pagination.numberOfPages = 1;
    }

    function courseUpdateFn(item) {
      cCtl.course = {
        name: item.name,
        id: item.id,
        prerequisite: item.prerequisite,
        professors: item.professors

      };

    }

    function courseDeleteFn(course) {
      cCtl.ListOfCourse = CourseService.deleteCourse(course.id);
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

