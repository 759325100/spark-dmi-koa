/*
* orm 初始化
 */
const Sequelize = require('sequelize')
const conf = require('../conf/conf')

const DB = {
  create: function () {
    if (process.env.NODE_ENV === 'production') {
      this.sequelize = new Sequelize(conf.mysql.production.database, conf.mysql.production.username, conf.mysql.production.password, conf.mysql.production)
    } else {
      this.sequelize = new Sequelize(conf.mysql.dev.database, conf.mysql.dev.username, conf.mysql.dev.password, conf.mysql.dev)
    }
    return this.sequelize
  }
}

module.exports = DB
