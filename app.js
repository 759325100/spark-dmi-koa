const Koa = require('koa')
const bodyParse = require('koa-body')
const timeout = require('koa-timeout-v2')
const serve = require('koa-static')
const cors = require('@koa/cors')
const OAuth2Server = require('./middleware/oauth')
const logger = require('./lib/logger')
const conf = require('./conf/conf')
const api = require('./api')
const db = require('./lib/db')
const Models = require('./models')
const OAuth = require('./lib/oauth')
const error = require('./lib/error')
const res = require('./lib/response')
const app = new Koa()

// 创建数据库连接 && 初始化数据库模型
const models = new Models().init(db.create())
// 创建Redis连接
const redis = require('./lib/redis').getRedis()
app.use(async (ctx, next) => {
  // 请求记录
  logger.info(`Request ${ctx.method} ${ctx.url}`)
  await next()
})
// 添加跨域
app.use(cors())
// 静态资源设置
app.use(serve('public/'))
// 添加body解析中间件
app.use(bodyParse())
// 超时处理
app.use(timeout(conf.http.timeout, {status: 200, message: JSON.stringify(error.internal.timeout)}))
// token验证
app.oauth = new OAuth2Server({
  model: new OAuth(redis),
  allow: conf.http.allow,
  ...conf.oauth2
})
// 验证
app.use(app.oauth.authorise())
// 挂载对象到当前请求
app.use(async (ctx, next) => {
  ctx.state.conf = conf
  ctx.state.logger = logger
  ctx.state.models = models
  ctx.state.redis = redis
  ctx.state.error = error
  ctx.state.response = res.response
  // 对后续的所有处理进行异常捕获（后续所以异步IO需要使用async/await）
  try {
    await next()
  } catch (ex) {
    error.unknown(ex, ctx)
  }
})
// 记录请求日志
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  logger.info(`Response ${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 初始化api下的路由
api.init(app)

// 未知异常捕获
app.on('error', (err, ctx) => {
  // 未处理的系统异常
  console.log(err)
  ctx.status = 200
  ctx.body = error.internal.serverError
})

app.listen(conf.http.port, () => {
  console.log(`http server started`)
})
