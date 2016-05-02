var angular = require('angular');

module.exports = 'terminal.services';
angular.module('terminal.services', [
  require('./dao')
]);