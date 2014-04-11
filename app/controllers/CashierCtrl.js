CashierCtrl = function($scope, $rootScope, $window, $location) {
  $scope.checkBrowser();
  $rootScope.activePage = 'cashier';
	$scope.DAO.getProducts();
  $scope.bill = {};

  $scope.sell = function() {
    $('#billModal').modal('hide');
    $scope.DAO.addSale($scope.bill.product.id, $scope.bill.amount, function(results) {
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
};
