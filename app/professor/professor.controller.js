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
      try {

        pCtl.message = null;
        pCtl.exeption = null;
        ProfessorService.addUpdateProfessor(pCtl.professor, successCallBack, errorCallback);
      }
      catch (ex) {
        pCtl.exeption = ex.message;

      }

    }

    function successCallBack() {
      pCtl.callServer(pCtl.tableCtl.tableState(), pCtl.tableCtl);
      pCtl.professor = {};
      pCtl.message = "Professor saved";


    }

    function errorCallback() {
      pCtl.exeption = 'Save Error!';
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
      var number = pagination.number || 1000;

      var result = ProfessorService.getAllProfessors();

      pCtl.displayed = result;
      tableState.pagination.numberOfPages = 1;
    }


    function professorUpdateFn(newProf) {

      pCtl.professor = {
        userName: newProf.userName,
        name: newProf.name,
        lastName: newProf.lastName,
        id: newProf.id
      };


    }

    function professorDeleteFn(professor) {
      ProfessorService.deleteProfessor(professor.id, function () {
        pCtl.callServer(pCtl.tableCtl.tableState(), pCtl.tableCtl);
      });


    }


  }

}(angular));

