var angular = require('angular');

module.exports = 'terminal.controllers.SettingsCtrl'
angular.module('terminal.controllers.SettingsCtrl', [])
  .controller('SettingsCtrl', function($scope, $rootScope){
    $rootScope.activePage = 'settings';
  });
