StatsCtrl = function($scope, $rootScope) {
  $scope.checkBrowser();
  $rootScope.activePage = 'stats';
  $scope.charts = [];
  $scope.datasets = [];

  $scope.DAO.getSaleStatsByDate(function(sales) {
    $scope.sales = sales;

    var dataset = {};
    var totalIncome = {};
    angular.forEach(sales, function(sale) {
      if(dataset[sale.productId])
        dataset[sale.productId].data.push([new Date(sale.date).getTime(), sale.saleAmount]);
      else
        dataset[sale.productId] = {
          label: sale.productName,
          data: [[new Date(sale.date).getTime(), sale.saleAmount]],
        };
    });
    var datasetArr = [];
    angular.forEach(dataset, function(val) {
      datasetArr.push(val);
    });

    console.log(datasetArr);
    $scope.dateStatChart = {
      dataset: datasetArr,
      options: {
        xaxis: {
          mode: 'time',
          timeformat: '%d.%m.%y'
        }
      }
    };

    $scope.$apply();
  });

};
