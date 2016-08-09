(function (angular) {
  'use strict';

  angular
    .module('ump')
    .controller('ProfessorController', ProfessorController);

  ProfessorController.$inject = ['ProfessorService'];

  /* @ngInject */
  function ProfessorController(ProfessorService) {
    var pCtl = this;
    pCtl.addProfessor = addProfessorFn;
    pCtl.cancelEdit = cancelEditFn;
    pCtl.callServer = callServerFn;
    pCtl.displayed = [];
    pCtl.professorUpdate = professorUpdateFn;
    pCtl.professorDelete = professorDeleteFn;
    pCtl.ListOfProfessors = ProfessorService.getAllProfessors;
    pCtl.isEdit = false;
    


    function addProfessorFn() {
      var item = pCtl.professor;
      pCtl.ListOfProfessors = ProfessorService.addUpdateProfessor(item);
      pCtl.item = {};
      pCtl.isEdit = false;
      pCtl.callServer(pCtl.tableCtl.tableState(), pCtl.tableCtl);

    }

    function cancelEditFn() {
      pCtl.professor = {};
      pCtl.isEdit = false;
    }


    pCtl.tableCtl = null;
    function callServerFn(tableState, tableCtl) {
      pCtl.tableCtl = tableCtl;
      var pagination = tableState.pagination;

      var start = pagination.start || 0;
      var number = pagination.number || 10;

      var result = ProfessorService.getPaged(
        start,
        number,
        tableState.search.predicateObject,
        tableState.sort.predicate,
        tableState.sort.reverse
      );

      pCtl.displayed = result.data;
      tableState.pagination.numberOfPages = result.numberOfPages;
    }


    function professorUpdateFn(newProf) {
      pCtl.isEdit = true;
      pCtl.professor = {
        name: newProf.name,
        lastName: newProf.lastName,
        id: newProf.id
      }
      ;


    }

    function professorDeleteFn(professor) {
      pCtl.ListOfProfessors = ProfessorService.deleteProfessor(pCtl.professor);
      return pCtl.ListOfProfessors;

    }


  }

}(angular));

