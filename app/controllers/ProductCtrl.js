ProductListCtrl = function($scope, $rootScope, $routeParams, $location) {
  $scope.checkBrowser();
  $rootScope.activePage = 'product-list';
  $scope.DAO.getProducts(function(products) {
    $scope.products = products;
    $scope.$apply();
  });

  $scope.deleteProduct = function(id){
    if($scope.productIdToBeDeleted == id) {
      $scope.DAO.deleteProductById(id);
      $scope.productIdToBeDeleted = 0;
      $scope.DAO.getProducts(function(products) {
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
};

ProductAddCtrl = function($scope, $rootScope, $routeParams, $location) {
  $scope.checkBrowser();
  $scope.product = {};
  $rootScope.activePage = 'product-add';

  $scope.addProduct = function() {
    if($scope.product.price >= 0) {
      $scope.errorMessage = null;
      $scope.DAO.addProduct($scope.product.name, $scope.product.price, function(results) {
        $scope.DAO.getProductById(results.insertId, function(product){
          $scope.addedProduct = product;
          $scope.$apply();
        });
      });
    }
    else
      $scope.errorMessage = $scope.strings.priceFieldNotNumber;
  };
};

ProductEditCtrl = function($scope, $rootScope, $routeParams, $location) {
  $scope.checkBrowser();
  $rootScope.activePage = 'product-edit';

  $scope.DAO.getProductById($routeParams.productId, function(product) {
    $scope.product = angular.copy(product);
    $scope.$apply();
  });



  $scope.saveProduct = function(){
    if($scope.product.price >= 0) {
      $scope.errorMessage = null;
      $scope.DAO.updateProduct($scope.product.id, {'name': $scope.product.name});
      $scope.DAO.updateProduct($scope.product.id, {'price': $scope.product.price});
      $location.path('/product/list');
      $rootScope.alert = {
        type: 'success',
        message: $scope.strings.productUpdateSuccess
      }
    }
    else
      $scope.errorMessage = $scope.strings.priceFieldNotNumber;
  };
};
