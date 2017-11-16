module.exports = {
  http: {
    port: 9001,
    allow: {
      options: ['/v1/users', '/users', '/wechatusers', '/users/login', '/public/(.{0,})'],
      post: ['/v1/users', '/users', '/wechatusers', '/users/login', '/users/checkemail', '/users/checkcode', '/user405s', '/anonymous/login'],
      get: ['/server/health', '/v1/access_tokens', '/public/(.{0,})', '/users/help', '/users/regagreement', '/user405s/createuserkey', '/schoolnotices/new/(.*?)'],
      delete: ['/v1/access_tokens/([0-9a-f]{40})'],
      put: ['/users/sendverificationcode', '/users/updatepassword']
    },
    // 根据系统性能理性设置（应小于2分钟）
    timeout: 30000
  },
  mysql: {
    production: {
      username: 'root',
      password: 'root123',
      database: 'sparkserver_dev02',
      host: '127.0.0.1',
      dialect: 'mysql',
      timezone: '+08:00',
      pool: {
        max: 10,
        min: 0,
        idle: 10000
      }
    },
    dev: {
      username: 'root',
      password: 'root123',
      database: 'sparkserver_dev02',
      host: '127.0.0.1',
      dialect: 'mysql',
      timezone: '+08:00',
      pool: {
        max: 10,
        min: 0,
        idle: 10000
      }
    }
  },
  redis: {
    port: 6379,
    url: '127.0.0.1'
  },
  oauth2: {
    grants: ['password'],
    debug: true,
    allowBearerTokensInQueryString: true,
    accessTokenLifetime: 90 * 24 * 60 * 60
  }
}
