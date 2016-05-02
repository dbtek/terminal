var angular = require('angular');
$ = require('jquery');

module.exports = 'terminal.controllers.CashierCtrl'
angular.module('terminal.controllers.CashierCtrl', [])
  .controller('CashierCtrl', function($scope, $rootScope, $window, $location) {
    $rootScope.activePage = 'cashier';
    $scope.DAO.getProducts(function(products) {
      $scope.products = products;
      $scope.$apply();
    });
    $scope.bill = {};

    $scope.sell = function() {
      $('#billModal').modal('hide');
      $scope.DAO.addSale($scope.bill.product.id, $scope.bill.amount, function(results) {
        // print the bill
        if($scope.settings.autoPrint)
          $scope.$apply(function() {
            $location.path('/bill/'+results.insertId)
            $location.search('print','true');
          });
        else {
          $scope.successMessage = $scope.strings.checkSaveSuccess.replace('{id}', results.insertId);
          $scope.$apply();
        }
      });
    };
  });
