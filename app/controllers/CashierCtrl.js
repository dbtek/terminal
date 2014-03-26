CashierCtrl = function($scope, $rootScope) {
  $scope.checkBrowser();
  $rootScope.activePage = 'cashier';
	$scope.DAO.getProducts();
};