var angular = require('angular');

module.exports = 'terminal.controllers.ProductCtrl'
angular.module('terminal.controllers.ProductCtrl', [])
  .controller('ProductListCtrl', function($scope, $rootScope, $routeParams, $location, DAO) {
    $rootScope.activePage = 'product-list';
    DAO.getProducts(function(products) {
      $scope.products = products;
      $scope.$apply();
    });

    $scope.deleteProduct = function(id){
      if($scope.productIdToBeDeleted == id) {
        DAO.deleteProductById(id);
        $scope.productIdToBeDeleted = 0;
        DAO.getProducts(function(products) {
          $scope.products = products;
          $scope.$apply();
        });
        $scope.alert = {
          type: 'success',
          message: $scope.strings.productDeleteSuccess
        }
      }
      else {
        $scope.productIdToBeDeleted = id;
      }
    }
  })
  // add controller
  .controller('ProductAddCtrl', function($scope, $rootScope, $routeParams, $location, DAO) {
    $scope.product = {};
    $rootScope.activePage = 'product-add';

    $scope.addProduct = function() {
      if($scope.product.price >= 0) {
        $scope.errorMessage = null;
        DAO.addProduct($scope.product.name, $scope.product.price, function(results) {
          DAO.getProductById(results.insertId, function(product){
            $scope.addedProduct = product;
            $scope.$apply();
          });
        });
      }
      else
        $scope.errorMessage = $scope.strings.priceFieldNotNumber;
    };
  })
  // edit controller
  .controller('ProductEditCtrl', function($scope, $rootScope, $routeParams, $location, DAO) {
    $rootScope.activePage = 'product-edit';

    DAO.getProductById($routeParams.productId, function(product) {
      $scope.product = angular.copy(product);
      $scope.$apply();
    });



    $scope.saveProduct = function(){
      if($scope.product.price >= 0) {
        $scope.errorMessage = null;
        DAO.updateProduct($scope.product.id, {'name': $scope.product.name});
        DAO.updateProduct($scope.product.id, {'price': $scope.product.price});
        $location.path('/product/list');
        $rootScope.alert = {
          type: 'success',
          message: $scope.strings.productUpdateSuccess
        }
      }
      else
        $scope.errorMessage = $scope.strings.priceFieldNotNumber;
    };
  });