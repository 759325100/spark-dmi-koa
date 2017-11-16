module.exports = {
  get: {
    '/:id': getUserById
  },
  post: {
    '/login': login
  }
}

async function getUserById (ctx) {
  // 参数验证
  if (ctx.state.error.check(ctx, ctx.state.error.generate([['p', 'id']]))) {
    let users = await ctx.state.redis.get('users')
    console.log(users)
    const findResult = await ctx.state.models.User.getUserById(ctx.params.id)
    // 成功使用该方法响应
    ctx.state.response(ctx, findResult)
  }
}

async function login (ctx) {
  if (ctx.state.error.check(ctx, ctx.state.error.generate([['b', 'username'], ['b', 'password']]))) {
    const authResult = await ctx.state.models.User.login(ctx.request.body.username, ctx.request.body.password)
    if (authResult) {
      ctx.state.response(ctx, authResult)
    } else {
      ctx.body = ctx.state.error.business.user.authError
    }
  }
}
