var MainCtrl = function($scope, $webSql, $location) {
  // $webSql Database Object. Defined later.
  var db;

  $scope.DAO = {
    /**
     * Gets all products from the database and applies them on scope.
     */
    getProducts: function() {
      db.selectAll('product', function(results) {
        $scope.products = [];
        for(i=0; i<results.rows.length; i++){
          $scope.products.push(results.rows.item(i));
        }
        $scope.$apply();
      });
    },
    getProductById: function(id, callback) {
      db.select('product', {'id': id }, function(results) {
        callback(results.rows.item(0));
      });
    },
    addProduct: function(name, price, callback) {
      db.insert('product', {'name': name, 'price': price}, callback);
    },
    updateProduct: function(id, fields, callback) {
      db.update('product', fields, {'id': id}, callback);
    },
    deleteProductById: function(id, callback) {
      db.del('product', {'id': id}, callback);
    }
  };

  $scope.checkBrowser = function() {
    if(typeof(openDatabase) == 'undefined') // redirect to error page
      $location.path('/browser-not-supported');
  };

  if(typeof(openDatabase) != 'undefined') {
    // Open database
    db = $webSql.openDatabase('kerms', '1.0', 'Kermes DB', 2 * 1024 * 1024);

    /*// Create product table
    executeQuery(
      $webSql.createTable('product', {
        'id':{
          'type': 'INTEGER',
          'null': 'NOT NULL',
          'primary': true,
          'auto_increment': true
        },
        'created':{
          'type': 'TIMESTAMP',
          'null': 'NOT NULL',
          'default': 'CURRENT_TIMESTAMP'
        },
        'name':{
          'type': 'TEXT',
          'null': 'NOT NULL'
        },
        'price': {
          'type': 'TEXT',
          'null': 'NOT NULL'
        }
      })
    );
*/
  }
};
