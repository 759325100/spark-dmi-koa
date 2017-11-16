/**
 * Copyright 2013-present Thom Seddon.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var NodeOAuthServer = require('./oauth2server')


/**
 * Constructor
 *
 * @param {Object} config Configuration object
 */
class OAuthServer {
  constructor (config) {
    if (!(this instanceof OAuthServer)) return new OAuthServer(config)
    config.continueAfterResponse = true
    this.server = new NodeOAuthServer(config)
  }

  authorise () {
    const self = this
    return async function (cxt, next) {
      try {
        await self.server.authorise(cxt, next)
        await next()
      } catch (err) {
        if (self.server.passthroughErrors) {
          throw err
        }
        return self.handleError(err, self.server, cxt)
      }
    }
  }

  async grant (cxt, next) {
    // Mock the jsonp method
    cxt.response.jsonp = function (body) {
      cxt.body = body
    }

    try {
      await this.server.grant(cxt.request, cxt.response)
    } catch (err) {
      if (this.server.passthroughErrors) {
        throw err
      }
      return this.handleError(err, this.server, cxt)
    }
    await next()
  }

  handleError (err, server, ctx) {
    ctx.type = 'json'
    ctx.status = 200

    if (err.headers) {
      ctx.set(err.headers)
    }
    ctx.body = {
      code: err.code,
      msg: err.message
    }
    err.type = 'oauth'
  }
}

module.exports = OAuthServer