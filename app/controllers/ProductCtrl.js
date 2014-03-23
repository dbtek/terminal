ProductCtrl = function($scope, $rootScope, Websql) {
    $rootScope.activePage = 'urun-ekle';
    $scope.product = {};

    $scope.addProduct = function(){
      $scope.executeQuery(Websql.insert('product', {'name': $scope.product.name, 'price': $scope.product.price}), function(results){
        $scope.getProductById(results.insertId, function(product){
          $scope.addedProduct = product;
          $scope.$apply();
        });
      });
    };
};
