(function (angular) {
  'use strict';

  angular
    .module('ump')
    .controller('TranslateController', TranslateController);

  TranslateController.$inject = ['$translate'];

  /* @ngInject */
  function TranslateController($translate) {
    var vm = this;
    vm.lang = $translate.use();
    vm.navBar = $translate.use();
    vm.student = $translate.use();
    vm.languages = [];
    vm.changeLanguage = changeLanguageFn;


    angular.forEach(umpTranslations, function (value, key) {
      if (umpTranslations.hasOwnProperty(key)) {
        vm.languages.push(key);
      }
    });

    function changeLanguageFn(langKey) {
      $translate.use(langKey);
      vm.lang = $translate.use();
      vm.navBar = $translate.use();
      vm.student = $translate.use();
    }
  }

}(angular));

