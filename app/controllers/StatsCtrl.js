StatsCtrl = function($scope, $rootScope) {
  $scope.checkBrowser();
  $rootScope.activePage = 'stats';
  $scope.charts = [];

  $scope.DAO.getSaleStatsByDate(function(stats) {
    $scope.stats = stats;
    $scope.$apply();
  });
};
