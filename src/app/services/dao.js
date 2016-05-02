var angular = require('angular');

module.exports = 'terminal.services.DAO';
angular.module('terminal.services.DAO', [
    require('../../assets/lib/angular-websql'),
  ])
  .factory('DAO', function($webSql) {
    // $webSql Database Object.
    var db = $webSql.openDatabase('pos-terminal', '1.0', 'Pos DB', 2 * 1024 * 1024);

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

    return {
      getDB: function() {
        return db;
      },

      /**
       * Gets all products from the database and applies them on scope.
       */
      getProducts: function(callback) {
        db.selectAll('product', function(results) {
          var products = [];
          for(i=0; i<results.rows.length; i++){
            products.push(results.rows.item(i));
          }
          callback(products);
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

      getSaleById: function(id, callback){
        db.select('sale', {'id': id }, function(results) {
          callback(results.rows.item(0));
        });
      },

      getSaleStatsByDate: function(callback) {
        db.executeQuery('SELECT product.name as productName, product.id as productId, sum(product.price*sale.amount) as value, sum(sale.amount) as saleAmount, DATE(sale.created) as date FROM sale ' +
                        'JOIN product on sale.productId=product.id ' +
                        'GROUP BY DATE(sale.created), product.id ', function(results) {
          var stats = [];
          for(i=0; i<results.rows.length; i++){
            stats.push(results.rows.item(i));
          }
          callback(stats);
        });
      },

      getSalesWhere: function(where, callback) {
        db.select('sale', where, function(results) {
          var sales = [];
          for(i=0; i<results.rows.length; i++){
            sales.push(results.rows.item(i));
          }
          callback(sales);
        });
      }
    };
  })