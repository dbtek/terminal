var MainCtrl = function($scope, $webSql, $location, $cookies) {
  // $webSql Database Object. Defined later.
  var db;
  $scope.local = local; // localization strings
  $scope.languages  = [{key: 'en', label:'English'}, {key:'tr', label:'Türkçe'}];
  var defaultSettings = { language: $scope.languages[0], autoPrint: true};

  if($cookies.settings) $scope.settings = JSON.parse($cookies.settings);
  if(!$scope.settings)
    $scope.settings = defaultSettings;

  $scope.$watch('settings', function() {
    console.log($scope.settings);
    if($scope.settings && $scope.settings.language) {
      $scope.strings = local[$scope.settings.language.key];
      $cookies.settings = JSON.stringify($scope.settings);
    }
  },true);

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
    },
    addSale: function(productId, amount, callback){
      db.insert('sale', {'productId': productId, 'amount': amount}, callback);
    },
    getSale: function(id, callback){
      db.select('sale', {'id': id }, function(results) {
        callback(results.rows.item(0));
      });
    }
  };

  $scope.checkBrowser = function() {
    if(typeof(db) == 'undefined') // redirect to error page
      $location.path('/browser-not-supported');
  };

  db = $webSql.openDatabase('kerms', '1.0', 'Kermes DB', 2 * 1024 * 1024);

  if(db) {
    // Create product table
    db.createTable('product', {
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
    });

    // Create sale table
    db.createTable('sale', {
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
      'productId':{
        'type': 'INTEGER',
        'null': 'NOT NULL'
      },
      'amount': {
        'type': 'INTEGER',
        'null': 'NOT NULL'
      }
    });
  }
};
