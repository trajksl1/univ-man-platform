/**
 *
 * dev
 *
 **/
var gulp = require('gulp');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var rev = require('gulp-rev-append');
var eslint = require('gulp-eslint');
var connect = require('gulp-connect');
var fs = require("fs");


var JS_APP = [
  'app/ump.module.js',
  'app/base/**/*.js',
  'app/directives/**/*.js',
  'app/dashboard/**/*.js',
  'app/courses/**/*.js',
  'app/enrollment/**/*.js',
  'app/professor/**/*.js',
  'app/student/**/*.js',
  'app/users/**/*.js',
  'app/calendar-exemple/**/*.js'
];

var TEMPLATES_SRC = [
  'app/**/*.html'
];

var CSS_APP = [
  'css/main.css'
];

var FONTS_LIB = [
  'bower_components/components-font-awesome/fonts/fontawesome-webfont.woff2',
  'bower_components/components-font-awesome/fonts/fontawesome-webfont.woff',
  'bower_components/components-font-awesome/fonts/fontawesome-webfont.ttf',
  'bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff2',
  'bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff'

];

var CSS_LIB = [
  'bower_components/bootstrap/dist/css/bootstrap.css',
  'bower_components/bootstrap-additions/dist/bootstrap-additions.css',
  'bower_components/components-font-awesome/css/font-awesome.min.css',
  'bower_components/angular-toastr/dist/angular-toastr.css',
  'bower_components/angular-loading-bar/build/loading-bar.css',
  'bower_components/angular-ui-select/dist/select.css',
  'bower_components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css',
  'bower_components/ngQuickDate/dist/ng-quick-date.css',
  'bower_components/ngQuickDate/dist/ng-quick-date-plus-default-theme.css',
  'bower_components/angular-bootstrap-colorpicker/css/colorpicker.css',
  'bower_components/angular-xeditable/dist/css/xeditable.css',
  'bower_components/angular-ui-select/dist/select.css',
  'bower_components/angular-ui-grid/ui-grid.css',
  'bower_components/angular-bootstrap/ui-bootstrap-csp.css',
  'bower_components/fullcalendar/dist/fullcalendar.css'

];


var JS_LIB = [
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
  'bower_components/bootstrap-switch/dist/js/bootstrap-switch.min.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-cookies/angular-cookies.js',
  'bower_components/angular-ui-router/release/angular-ui-router.min.js',
  'bower_components/angular-resource/angular-resource.min.js',
  'bower_components/angular-translate/angular-translate.min.js',
  'bower_components/angular-sanitize/angular-sanitize.min.js',
  'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
  'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
  'bower_components/angular-smart-table/dist/smart-table.js',
  'bower_components/momentjs/moment.js',
  'bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js',
  'bower_components/angular-toastr/dist/angular-toastr.js',
  'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
  'bower_components/angular-strap/dist/angular-strap.min.js',
  'bower_components/angular-strap/dist/angular-strap.tpl.min.js',
  'bower_components/angular-loading-bar/build/loading-bar.js',
  'bower_components/select2/select2.js',
  'bower_components/angular-ui-select/dist/select.js',
  'bower_components/is_js/is.min.js',
  'bower_components/angular-file-upload/angular-file-upload.js',
  'bower_components/ngQuickDate/dist/ng-quick-date.js',
  'bower_components/sockjs/sockjs.js',
  'bower_components/stomp-websocket/lib/stomp.js',
  'bower_components/stompie/stompie.min.js',
  'bower_components/ng-stomp/ng-stomp.min.js',
  'bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',
  'bower_components/angular-bootstrap-switch/dist/angular-bootstrap-switch.min.js',
  'bower_components/angular-xeditable/dist/js/xeditable.js',
  'bower_components/ngstorage/ngStorage.js',
  'bower_components/angular-ui-select/dist/select.js',
  'bower_components/angular-ui-grid/ui-grid.js',
  'bower_components/angular-smart-table/dist/smart-table.js',
  'bower_components/angular-bootstrap/ui-bootstrap.js',
  'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
  'bower_components/angular-cookies/angular-cookies.js',
  'bower_components/bootstrap-ui-datetime-picker/dist/datetime-picker.min.js',
  'bower_components/angular-ui-calendar/src/calendar.js',
  'bower_components/fullcalendar/dist/fullcalendar.min.js',
  'bower_components/fullcalendar/dist/gcal.js'
];


/**
 *   The location of the resources for deploy
 */
var DESTINATION = 'dest/';

var FONTS_DESTINATION = 'fonts/';
/**
 * The single page initial html file. It will be altered
 * by this script.
 */
var INDEX_FILE = 'index.html';
/**
 * The name of the angular module
 */
var MODULE_NAME = 'ump';
/**
 * The URL of the back-end API
 */
var API_URL = 'http://localhost:8080/api';
/**
 * Route to which the API calls will be mapped
 */
var API_ROUTE = '/api';

/**
 * Task for concatenation of the js libraries used
 * in this project
 */
gulp.task('concat_js_lib', function () {
  return gulp.src(JS_LIB) // which js files
    .pipe(concat('lib.js')) // concatenate them in lib.js
    .pipe(gulp.dest(DESTINATION)); // save lib.js in the DESTINATION folder
});

/**
 * Task for concatenation of the css libraries used
 * in this project
 */
gulp.task('concat_css_lib', function () {
  return gulp.src(CSS_LIB) // which css files
    .pipe(concat('lib.css')) // concat them in lib.css
    .pipe(gulp.dest(DESTINATION)); // save lib.css in the DESTINATION folder
});

/**
 * Task for concatenation of the js code defined
 * in this project
 */
gulp.task('concat_js_app', function () {
  return gulp.src(JS_APP)
    .pipe(concat('src.js'))
    .pipe(gulp.dest(DESTINATION));
});

/**
 * Task for concatenation of the css code defined
 * in this project
 */
gulp.task('concat_css_app', function () {
  return gulp.src(CSS_APP)
    .pipe(concat('app.css'))
    .pipe(gulp.dest(DESTINATION));
});

/**
 * Task for concatenation of the html templates defined
 * in this project
 */
gulp.task('templates', function () {
  return gulp.src(TEMPLATES_SRC) // which html files
    .pipe(
      templateCache('templates.js', { // compile them as angular templates 
        module: MODULE_NAME, // from module MODULE_NAME 
        root: 'app' // of the app
      }))
    .pipe(gulp.dest(DESTINATION));
});

/**
 * Task for adding the revision as parameter
 * for cache braking
 */
gulp.task('cache-break', function () {
  return gulp.src(INDEX_FILE) // use the INDEX_FILE as source
    .pipe(rev()) // append the revision to all resources
    .pipe(gulp.dest('.')); // save the modified file at the same destination
});

gulp.task('fonts', function () {
  return gulp.src(FONTS_LIB)
    .pipe(gulp.dest(FONTS_DESTINATION));
});

var tasks = [
  'concat_js_lib',
  'concat_css_lib',
  'concat_js_app',
  'concat_css_app',
  'fonts',
  'templates'
];

gulp.task('build', tasks, function () {
  gulp.start('cache-break');
});

gulp.task('watch', function () {
  gulp.watch('app/**/**.js', ['concat_js_app', 'cache-break']);
  gulp.watch(TEMPLATES_SRC, ['templates', 'cache-break']);
  gulp.watch('css/**/**.css', ['concat_css_app', 'cache-break']);
});

gulp.task('serve', function () {
  connect.server({
    port: 8000,
    livereload: true,
    middleware: function (connect, opt) {
      return [
        (function () {
          var url = require('url');
          var proxy = require('proxy-middleware');
          var options = url.parse(API_URL);
          options.route = API_ROUTE;
          return proxy(options);
        })()
      ];
    }
  });
});

gulp.task('default', ['serve', 'watch']);
