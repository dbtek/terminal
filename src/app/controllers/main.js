var angular = require('angular');
var local = require('../local');

module.exports = 'terminal.controllers.MainCtrl'
angular.module('terminal.controllers.MainCtrl', [])
  .controller('MainCtrl', function($scope, $webSql, $location, $cookies) {
    $scope.local = local; // localization strings
    $scope.languages  = [{key: 'en', label:'English'}, {key:'tr', label:'Türkçe'}];
    $scope.currencies = [{key: 'USD', label:'USD', icon: 'fa fa-usd'}, {key: 'TRY', label: 'Türk Lirası', icon:'fa fa-try'}, {key: 'EUR', label:'Euro', icon:'fa fa-euro'}]
    var defaultSettings = { language: $scope.languages[0], autoPrint: true, currency: $scope.currencies[0]};

    if($cookies.settings) $scope.settings = JSON.parse($cookies.settings);
    if(!$scope.settings)
      $scope.settings = defaultSettings;

    $scope.$watch('settings', function() {
      if($scope.settings && $scope.settings.language) {
        $scope.strings = local[$scope.settings.language.key];
        $cookies.settings = JSON.stringify($scope.settings);
      }
    },true);
  });
