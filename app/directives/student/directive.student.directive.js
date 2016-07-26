(function (angular) {
  'use strict';

  angular
    .module('ump')
    .directive('student', directiveStudentFn);

  directiveStudentFn.$inject = [];

  /* @ngInject */
  function directiveStudentFn() {
    var directive = {

      link: link,
      templateUrl: 'app/directives/student/directive.student.template.html',
      restrict: 'A',
      scope: {
        student: '='
      }
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }


}(angular));

