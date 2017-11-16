/*
* Redis的创建及管理
 */
const IORedis = require('ioredis')
const conf = require('../conf/conf')

class Redis {
  constructor () {
    this.conn = new IORedis(conf.redis.port, conf.redis.url, {dropBufferSupport: true})
  }

  getRedis () {
    return this.conn
  }
}

module.exports = new Redis()