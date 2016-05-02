'use strict';
var angular = window.angular = require('angular');
window.$ = window.jQuery = require('jquery');
require('flot');
require('flot/jquery.flot.time');
require('angular-flot');
require('bootstrap');

module.exports = 'terminal'
var app = angular.module('terminal', [
  'angular-flot',
  require('../assets/lib/angular-websql'),
  require('angular-route'),
  require('angular-cookies'),
  require('./controllers'),
  require('./directives'),
  require('./filters')
]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
      templateUrl: 'templates/cashier.html'
    })
    .when('/product/list', {
      templateUrl: 'templates/product/list.html'
    })
    .when('/product/add', {
      templateUrl: 'templates/product/add.html'
    })
    .when('/product/edit/:productId', {
      templateUrl: 'templates/product/edit.html'
    })
    .when('/bill/:saleId', {
      templateUrl: 'templates/bill.html'
    })
    .when('/settings', {
      templateUrl: 'templates/settings.html'
    })
    .when('/stats', {
      templateUrl: 'templates/stats.html'
    })
    .when('/browser-not-supported', {
      templateUrl: 'templates/browserNotSupported.html'
    })
    .otherwise({redirectTo: '/'});
});