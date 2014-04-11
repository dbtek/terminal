'use strict';

var app = angular.module('terminal', ['ngRoute','angular-websql']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'templates/cashier.html'
  });

  $routeProvider.when('/product/list', {
    templateUrl: 'templates/product/list.html'
  });

  $routeProvider.when('/product/add', {
    templateUrl: 'templates/product/add.html'
  });

  $routeProvider.when('/product/edit/:productId', {
    templateUrl: 'templates/product/edit.html'
  });

  $routeProvider.when('/bill/:saleId', {
    templateUrl: 'templates/bill.html'
  });

  $routeProvider.when('/settings', {
    templateUrl: 'templates/settings.html'
  });

  $routeProvider.when('/browser-not-supported', {
    templateUrl: 'templates/browserNotSupported.html'
  });

  $routeProvider.otherwise({redirectTo: '/'});
});

app.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if(event.which === 13) {
        scope.$apply(function(){
          scope.$eval(attrs.ngEnter, {'event': event});
        });

        event.preventDefault();
      }
    });
  };
});

app.filter('replace',
  function() {
    return function(text, key, value) {
      return text.replace(key, value);
    }
  });
