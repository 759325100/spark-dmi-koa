/*
* 用于定义系统响应格式，以及响应前的基本处理
 */
module.exports = {
  response: function (ctx, data) {
    ctx.body = {code: 1, msg: 'success', data: data}
  }
}