'use strict';

var app = angular.module('kerms', ['ngRoute','paulocaldeira17.angular.websql']);

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
});
