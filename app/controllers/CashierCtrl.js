CashierCtrl = function($scope, $rootScope) {
	$scope.DAO.getProducts();
	$rootScope.activePage = 'cashier';
};
