/*
* 系统所有错误代码及可实现的错误检测和处理
 */
const error = {
  token: {
    invalid: {
      code: 10000,
      msg: 'The access token provided is invalid'
    },
    expired: {
      code: 10002,
      msg: 'The access token provided has expired'
    },
    legal: {
      code: 10003,
      msg: 'The dtit_key is not legal'
    }
  },
  params: {
    legal: {
      code: 20000,
      msg: 'parameter is not legal'
    },
    lackToken: {
      code: 20101,
      msg: 'The access token was not found'
    },
    lackId: {
      code: 20102,
      msg: 'The id was not found'
    }
  },
  io: {
    dbError: {
      code: 30100,
      msg: 'Database operation failed'
    },
    redisError: {
      code: 30200,
      msg: 'Redis operation failed'
    },
    redisValueNotFound: {
      code: 30201,
      msg: 'Redis value not found'
    }
  },
  business: {
    user: {
      authError: {
        code: 40200,
        msg: 'Username or password error'
      }
    }
  },
  internal: {
    serverError: {
      code: 99999,
      msg: 'Busy server'
    },
    timeout: {
      code: 99998,
      msg: 'Request timeout'
    }
  },
  check (ctx, params) {
    let ok = true
    params.forEach(p => {
      if (p.type === 'params' && !ctx.params[p.name]) {
        ok = false
      } else if (p.type === 'body' && !ctx.request.body[p.name]) {
        ok = false
      } else if (p.type === 'query' && !ctx.request.query[p.name]) {
        ok = false
      }
    })
    if (!ok) {
      ctx.body = this.params.legal
    }
    return ok
  },
  generate (params) {
    let result = []
    // 根据params转换成check格式
    params.forEach(p => {
      if (p.length > 1) {
        p = {type: p[0] === 'p' ? 'params' : p[0] === 'b' ? 'body' : p[0] === 'q' ? 'query' : p[0], name: p[1]}
      } else {
        p = {type: 'params', name: p[0]}
      }
      result.push(p)
    })
    return result
  },
  unknown (err, ctx) {
    // 对未知异常进行处理，主要包含 1、自定义的异常  2、系统内部异常 3、IO异常（包含Redis、Mysql、文件操作等）
    console.log(err.code)
  }
}

module.exports = error