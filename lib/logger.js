/*
* 系统日志模块，用于配置格式及记录位置灯
 */
const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')
const stackTrace = require('stack-trace')
const moment = require('moment')

const dateFormat = function () {
  return moment().format('YYYY-MM-DD HH:mm:ss:SSS')
}

const infoLoggerTransport = new DailyRotateFile({
  name: 'info',
  filename: './logs/info/info.log',
  timestamp: dateFormat,
  level: 'info',
  colorize: true,
  maxsize: 1024 * 1024 * 10,
  datePattern: '.yyyy-MM-dd'
})

const errorTransport = new (winston.transports.File)({
  name: 'error',
  filename: './logs/error/error.log',
  timestamp: dateFormat,
  level: 'error',
  colorize: true
})

const logger = new (winston.Logger)({
  transports: [
    new winston.transports.Console({
      timestamp: dateFormat,
      colorize: true
    }),
    infoLoggerTransport,
    errorTransport
  ]
})

let originalMethod = logger.error
logger.error = function () {
  let cellSite = stackTrace.get()[1]
  originalMethod.apply(logger, [arguments[0] + '\n', {
    filePath: cellSite.getFileName(),
    lineNumber: cellSite.getLineNumber()
  }])
}


module.exports = logger