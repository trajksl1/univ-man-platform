(function (angular) {
  'use strict';

  angular
    .module('ump')
    .controller('CalendarController', CalendarController);

  CalendarController.$inject = ['$scope', 'CalendarMockService', 'uiCalendarConfig', '$timeout'];

  /* @ngInject */
  function CalendarController($scope, CalendarMockService, uiCalendarConfig, $timeout) {

    var caCtl = this;
    caCtl.removeSource = removeSource;
    caCtl.calendarSource = [];
    caCtl.allSources = [];

    
    function onEventSource(source) {
      var calendar = uiCalendarConfig.calendars['myCalendar'];

      caCtl.allSources.push(source);
      visibleSourceStyle(source);
      calendar.fullCalendar('addEventSource', source);

    }

    CalendarMockService.absences({
      name: 'absences',
      color: '#f00',
      textColor: 'yellow',
      events: []
    }, onEventSource);

    CalendarMockService.trainings({
      name: 'trainings',
      color: '#00f',
      textColor: 'white',
      events: []
    }, onEventSource);


    caCtl.uiConfig = {
      calendar: {
        height: 450,
        editable: true,
        header: {
          left: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventClick: function(item) {
          console.log(item)
        },
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };

    function removeSource(eventSource) {
      var calendar = uiCalendarConfig.calendars['myCalendar'];

      eventSource.hidden = !eventSource.hidden;
      if (eventSource.hidden) {
        calendar.fullCalendar('removeEventSource', eventSource);
        eventSource.style = {};
      } else {
        visibleSourceStyle(eventSource);
        calendar.fullCalendar('addEventSource', eventSource);
      }
      console.log(eventSource)
    }

    function visibleSourceStyle(eventSource) {
      eventSource.style = {
        'backgroundColor': eventSource.color,
        'color': eventSource.textColor
      };
    }

  }


}(angular));

