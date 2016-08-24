(function (angular) {
  'use strict';

  angular
    .module('ump')
    .factory('ProfessorService', ProfessorServiceFn);

  ProfessorServiceFn.$inject = ['$resource', '$filter'];

  /* @ngInject */
  function ProfessorServiceFn($resource, $filter) {
    var professorResource = $resource('/api/professor/:id', {}, {});
    return {
      getAllProfessors: getAllProfessorsFn,
      deleteProfessor: deleteProfessorFn,
      addUpdateProfessor: addUpdateProfessorFn,
      getPaged: getPagedFn

    };
    function getAllProfessorsFn() {
      return professorResource.query();

    }

    function deleteProfessorFn(id, successCallback) {
      professorResource.delete({id: id}, successCallback);

    }

    function addUpdateProfessorFn(item, successCallBack, errorCallback) {
      professorResource.save(item, successCallBack, errorCallback);

    }


    function getPagedFn(start,
                        number,
                        predicateObject,
                        sortPredicate,
                        sortReverse) {
    }


  }

}(angular));

