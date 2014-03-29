BillCtrl = function($scope, $routeParams, $location, $window) {
  $scope.DAO.getSale($routeParams.saleId, function(sale){
    $scope.sale = sale;
    $scope.$apply();
    $scope.DAO.getProductById(sale.productId, function(product){
      $scope.product = product;
      $scope.$apply();
      if($location.search().print) {
        $window.print();
        $window.history.back();
      }
    });
  });
};
