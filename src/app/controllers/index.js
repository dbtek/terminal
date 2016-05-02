angular = require('angular');

module.exports = 'terminal.controllers';
angular.module('terminal.controllers', [
  require('./bill'),
  require('./cashier'),
  require('./main'),
  require('./product'),
  require('./settings'),
  require('./stats')
]);