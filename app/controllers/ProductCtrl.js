ProductListCtrl = function($scope, $rootScope, Websql, $routeParams, $location) {
  $rootScope.activePage = 'product-list';
  $scope.getProducts();

  $scope.deleteProduct = function(id){
    if($scope.productIdToBeDeleted == id) {
      $scope.deleteProductById(id);
      $scope.productIdToBeDeleted = 0;
      $scope.getProducts();
    }
    else {
      $scope.productIdToBeDeleted = id;
    }
  }
};

ProductAddCtrl = function($scope, $rootScope, Websql, $routeParams, $location) {
  $scope.product = {};
  $rootScope.activePage = 'product-add';

  $scope.addProduct = function(){
    $scope.executeQuery(Websql.insert('product', {'name': $scope.product.name, 'price': $scope.product.price}), function(results){
      $scope.getProductById(results.insertId, function(product){
        $scope.addedProduct = product;
        $scope.$apply();
      });
    });
  };
};

ProductEditCtrl = function($scope, $rootScope, Websql, $routeParams, $location) {
  $rootScope.activePage = 'product-edit';
  $scope.getProductById($routeParams.productId, function(product) {
    $scope.product = product;
    $scope.$apply();
  });
};
