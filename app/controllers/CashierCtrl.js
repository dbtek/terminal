CashierCtrl = function($scope, $rootScope, $window, $location) {
  $scope.checkBrowser();
  $rootScope.activePage = 'cashier';
	$scope.DAO.getProducts();
  $scope.bill = {};

  $scope.sell = function() {
    $('#billModal').modal('hide');
    $scope.DAO.addSale($scope.bill.product.id, $scope.bill.amount, function(results){
      // print the bill
      $scope.$apply(function() {
        $location.path('/bill/'+results.insertId)
        $location.search('print','true');
      });
    });
  };
};
