var angular = require('angular');

module.exports = 'terminal.filters.replace';
angular.module('terminal.filters.replace', [])
  .filter('replace', function() {
    return function(text, key, value) {
      return text.replace(key, value);
    }
  });