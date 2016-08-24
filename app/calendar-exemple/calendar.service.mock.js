(function () {
  'use strict';

  angular
    .module('ump')
    .factory('CalendarMockService', CalendarMockService);

  CalendarMockService.$inject = ['$timeout'];

  /* @ngInject */
  function CalendarMockService($timeout) {


    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var service = {
      absences: absences,
      trainings: trainings
    };
    return service;

    ////////////////

    function absences(eventSource, callback) {


      $timeout(function () {
        var events = [
          {title: 'All Day Event', start: new Date(y, m, 1)},
          {title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2)},
          {id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false},
          {id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false},
          {
            title: 'Birthday Party',
            start: new Date(y, m, d + 1, 19, 0),
            end: new Date(y, m, d + 1, 22, 30),
            allDay: false
          },
          {title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/'}
        ];

        angular.forEach(events, function (e) {
          e.color = eventSource.color;
          e.textColor = eventSource.textColor;
          eventSource.events.push(e);
        });
        console.log('events absences changed')
        callback(eventSource);
      }, 2000);
      return eventSource;
    }

    function trainings(eventSource, callback) {


      $timeout(function () {
        var events = [
          {
            type: 'party',
            title: 'Lunch',
            start: new Date(y, m, d, 12, 0),
            end: new Date(y, m, d, 14, 0),
            allDay: false
          },
          {
            type: 'party',
            title: 'Lunch 2',
            start: new Date(y, m, d, 12, 0),
            end: new Date(y, m, d, 14, 0),
            allDay: false
          },
          {
            type: 'party',
            title: 'Click for Google',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            url: 'http://google.com/'
          }
        ];
        console.log('trainings loaded')
        angular.forEach(events, function (e) {

          e.color = eventSource.color;
          e.textColor = eventSource.textColor;
          eventSource.events.push(e);
        });
        callback(eventSource);
      }, 2000);
      return eventSource;

    }
  }

})();

