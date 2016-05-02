var angular = require('angular');

module.exports = 'terminal.controllers.BillCtrl'
angular.module('terminal.controllers.BillCtrl', [])
  .controller('BillCtrl', function($scope, $routeParams, $location, $window, DAO) {
    DAO.getSaleById($routeParams.saleId, function(sale){
      $scope.sale = sale;
      $scope.$apply();
      DAO.getProductById(sale.productId, function(product){
        $scope.product = product;
        $scope.$apply();
        if($location.search().print) {
          $window.print();
          $window.history.back();
        }
      });
    });
  });