ProductListCtrl = function($scope, $rootScope, Websql, $routeParams, $location) {
  $rootScope.activePage = 'product-list';
  $scope.DAO.getProducts();

  $scope.deleteProduct = function(id){
    if($scope.productIdToBeDeleted == id) {
      $scope.DAO.deleteProductById(id);
      $scope.productIdToBeDeleted = 0;
      $scope.DAO.getProducts();
    }
    else {
      $scope.productIdToBeDeleted = id;
    }
  }
};

ProductAddCtrl = function($scope, $rootScope, Websql, $routeParams, $location) {
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
      $scope.errorMessage = 'Lütfen geçerli bir fiyat bilgisi giriniz.';
  };
};

ProductEditCtrl = function($scope, $rootScope, Websql, $routeParams, $location) {
  $rootScope.activePage = 'product-edit';
  $scope.DAO.getProductById($routeParams.productId, function(product) {
    $scope.product = angular.copy(product);
    $scope.$apply();
  });

  $scope.saveProduct = function(){
    $scope.DAO.updateProduct($scope.product.id, {'name': $scope.product.name});
    $scope.DAO.updateProduct($scope.product.id, {'price': $scope.product.price});
    $location.path('/product/list');
  };
};
