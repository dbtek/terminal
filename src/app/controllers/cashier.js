var angular = require('angular');

module.exports = 'terminal.controllers.CashierCtrl'
angular.module('terminal.controllers.CashierCtrl', [])
  .controller('CashierCtrl', function($scope, $rootScope, $window, $location, DAO) {
    $rootScope.activePage = 'cashier';
    DAO.getProducts(function(products) {
      $scope.products = products;
      $scope.$apply();
    });
    $scope.bill = {};

    $scope.sell = function() {
      $('#billModal').modal('hide');
      // print the bill
      if($scope.settings.autoPrint) {
        DAO.addSale($scope.bill.product.id, $scope.bill.amount, function(results) {
          $scope.$apply(function() {
            $location.path('/bill/'+results.insertId)
            $location.search('print','true');
          });
        });
      }
      else {
        DAO.addProductToCart($scope.bill.product.id, $scope.bill.amount);
      }
    };
  });
