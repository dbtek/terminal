var angular = require('angular');

module.exports = 'terminal.controllers.CartCtrl'
angular.module('terminal.controllers.CartCtrl', [])
  .controller('CartCtrl', function($scope, $routeParams, $location, $window, DAO) {

    $scope.getProducts = function() {
      DAO.getCart(function(products) {
        $scope.products = [];
        angular.forEach(products, function(product) {
          DAO.getProductById(product.productId, function(pro) {
            product.name = pro.name;
            product.price = pro.price;
            $scope.products.push(product);
            console.log($scope.products);
            $scope.$apply();
          });
        });
      });
    };

    $scope.getProducts();

    $scope.increaseAmount = function(product) {
      product.amount++;
      $scope.updateProductAmount(product);
    };

    $scope.decreaseAmount = function(product) {
      if(product.amount-1 > 0) {
        product.amount--;
        $scope.updateProductAmount(product);
      }
    };

    $scope.updateProductAmount = function(product) {
      DAO.updateProductOnCart(product.id, {amount: product.amount});
    };

    $scope.deleteProduct = function(product) {
      DAO.deleteProductFromCartById(product.id);
      $scope.getProducts();
    };

    $scope.sell = function() {
      $('#billModal').modal('hide');
      DAO.addSale($scope.bill.product.id, $scope.bill.amount, function(results) {
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