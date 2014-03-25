var MainCtrl = function($scope, Websql) {
  // Open database
  $scope.db = openDatabase('kerms', '1.0', 'Kermes DB', 2 * 1024 * 1024);

  /**
  * Executes Web Sql queries.
  * @param {string} query - Sql query to be executed.
  * @param {function} callback - Callback function to get result set.
  * @function
  */
  var executeQuery = function(query, callback) {
    $scope.db.transaction(function (tx) {
      tx.executeSql(query, [], function(tx,results) {
        if(callback)
          callback(results);
      });
    });
  };

  $scope.DAO = {
    /**
     * Gets all products from the database and applies them on scope.
     */
    getProducts: function() {
      $scope.db.transaction(function (tx) {
        executeQuery(Websql.selectAll('product'), function(results) {
          $scope.products = [];
          for(i=0; i<results.rows.length; i++){
            $scope.products.push(results.rows.item(i));
          }
          $scope.$apply();
        });
      });
    },
    getProductById: function(id, callback){
      executeQuery(Websql.select('product', {'id': id }), function(results) {
        callback(results.rows.item(0));
      });
    },
    addProduct: function(name, price, callback) {
      executeQuery(Websql.insert('product', {'name': name, 'price': price}), callback);
    },
    updateProduct: function(id, fields, callback) {
      executeQuery(Websql.update('product', fields, {'id': id}), callback);
    },
    deleteProductById: function(id, callback){
      executeQuery(Websql.del('product', {'id': id}), callback)
    }
  };

  // Create product table
  executeQuery(
    Websql.createTable('product', {
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
};
