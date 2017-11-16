const fs = require('fs')
const Router = require('koa-router')

class API {
  constructor () {
    this.dir = './api/'
  }

  init (app) {
    this.app = app
    this.findRouter()
  }

  findRouter (dir) {
    const curDir = dir || this.dir
    const fileList = fs.readdirSync(curDir, 'utf-8')
    fileList && fileList.forEach(file => {
      if (file === 'index.js') {
        return
      }
      const stat = fs.lstatSync(curDir + file)
      if (stat.isDirectory()) {
        this.findRouter(curDir + file + '/')
      } else {
        this.loadRoute(curDir + file)
      }
    })
  }

  loadRoute (routerFile) {
    const route = require(('.' + routerFile.substring(this.dir.length - 1, routerFile.lastIndexOf('.'))))
    const routePath = routerFile.substring(routerFile.lastIndexOf('/'), routerFile.lastIndexOf('.'))
    // 解析并获得路由对象
    const router = this.createRouter(route, route.basePath || routePath)
    this.app.use(router.routes())
  }

  createRouter (router, after) {
    const newRouter = new Router({
      prefix: after
    })
    for (let method in router) {
      for (let r in router[method]) {
        console.log(`method:${method} router: ${after + r}`)
        newRouter[method](r, router[method][r])
      }
    }
    return newRouter
  }
}

module.exports = new API()