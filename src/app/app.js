'use strict';
var angular = window.angular = require('angular');
window.$ = window.jQuery = require('jquery');
require('flot');
require('flot/jquery.flot.time');
require('angular-flot');
require('bootstrap');

module.exports = 'terminal'
var app = angular.module('terminal', [
  require('angular-route'),
  require('./services'),
  require('./controllers'),
  require('./directives'),
  require('./filters')
])
// config phase
.config(function ($routeProvider, $locationProvider) {
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
    .when('/cart', {
      templateUrl: 'templates/cart.html',
      controller: 'CartCtrl'
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
})
// run phase

.run(function($rootScope, $location, DAO) {
  $rootScope.$on('$routeChangeSuccess', function() {
    if(typeof(DAO.getDB()) == 'undefined') // redirect to error page
      $location.path('/browser-not-supported');
  });
})