(function (angular) {
  'use strict';

  angular
    .module('ump')
    .controller('NavigationController', NavigationControllerFn);

  NavigationControllerFn.$inject = ['NavigationService', '$state'];

  /* @ngInject */
  function NavigationControllerFn(NavigationService, $state) {
    var nCtl = this;
    nCtl.pages = NavigationService.getPage();
    nCtl.stateCtl=$state;0


  }

}(angular));

