const mysql = require("mysql");

class Database {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
    this.connection.connect(function(err) {
      if(err) throw new Error("Error connecting to database: " + err.message);
    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, function(err, dbResult) {
        if(err) reject(err);
        resolve(dbResult);
      });
    });
  }
}

module.exports = Database;