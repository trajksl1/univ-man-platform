(function (angular) {
  'use strict';

  angular
    .module('ump')
    .factory('ProfessorService', ProfessorServiceFn);

  ProfessorServiceFn.$inject = ['$localStorage', '$filter'];

  /* @ngInject */
  function ProfessorServiceFn($localStorage, $filter) {
    return {
      getAllProfessors: getAllProfessorsFn,
      deleteProfessor: deleteProfessorFn,
      addUpdateProfessor: addUpdateProfessorFn,
      getPaged: getPagedFn

    };
    function getAllProfessorsFn() {
      return $localStorage.ListOfProfessors;

    }

    function deleteProfessorFn(professor) {
      var index = $localStorage.ListOfPredmets.indexOf(profesor);
      if (index !== -1) {
        $localStorage.ListOfPredmets.splice(index, 1);
      }
      return $localStorage.ListOfPredmets;

    }

    function initStateFn() {
      if ($localStorage.ListOfProfessors === undefined || $localStorage.ListOfProfessors === null) {
        return $localStorage.ListOfProfessors = [];
      }

    }

    function findProfessorFn(id) {
      var result = null;
      angular.forEach($localStorage.ListOfProfessors, function (e) {
        if (e.id === id) {
          result = e;
        }

      });
      return result;


    }

    function updateProfessorFn(professor, newValue) {
      professor.name = newValue.name;
      professor.lastName = newValue.lastName;
      professor.id = newValue.id;

    }

    function addUpdateProfessorFn(item) {
      initStateFn();
      var professor = findProfessorFn(item.id);
      if (professor === null) {
        $localStorage.ListOfProfessors.push(item);
      }
      else {
        updateProfessorFn(professor, item);
      }
      return $localStorage.ListOfProfessors;

    }

    function getPagedFn(start,
                        number,
                        predicateObject,
                        sortPredicate,
                        sortReverse) {
      var filtered = predicateObject ?
        $filter('filter')($localStorage.ListOfProfessors, predicateObject) :
        $localStorage.ListOfProfessors;

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


  }

}(angular));

