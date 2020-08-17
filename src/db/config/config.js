const path = require('path');
const storage = path.join(__dirname, '../../../db.sqlite');

module.exports = {
  development: {
    dialect: "sqlite",
    storage
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory'
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
  }
}
