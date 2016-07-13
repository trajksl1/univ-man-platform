(function (angular) {
  'use strict';
  angular
    .module('ump')
    .config(config)
    .run(run);

  config.$inject = ['$translateProvider'];
  run.$inject = [];

  function config($translateProvider) {
    angular.forEach(umpTranslations, function (value, key) {
      if (umpTranslations.hasOwnProperty(key)) {
        $translateProvider.translations(key, value);
      }
    });
    $translateProvider.useCookieStorage();
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
  }


  function run() {
  }

}(angular));
