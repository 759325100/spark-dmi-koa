/**
 * Copyright 2013-present NightWorld.
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

const Authorise = require('./authorise')
const Grant = require('./grant')

/**
 * Constructor
 *
 * @param {Object} config Configuration object
 */
class OAuth2Server {
  constructor (config) {
    if (!(this instanceof OAuth2Server)) return new OAuth2Server(config)

    config = config || {}

    if (!config.model) throw new Error('No model supplied to OAuth2Server')
    this.model = config.model

    this.grants = config.grants || []
    this.debug = config.debug || function () {
    }
    if (typeof this.debug !== 'function') {
      this.debug = console.log
    }
    this.passthroughErrors = config.passthroughErrors
    this.continueAfterResponse = config.continueAfterResponse

    this.accessTokenLifetime = config.accessTokenLifetime !== undefined ?
      config.accessTokenLifetime : 3600
    this.refreshTokenLifetime = config.refreshTokenLifetime !== undefined ?
      config.refreshTokenLifetime : 1209600
    this.authCodeLifetime = config.authCodeLifetime || 30

    this.regex = {
      clientId: config.clientIdRegex || /^[a-z0-9-_]{3,40}$/i,
      grantType: new RegExp('^(' + this.grants.join('|') + ')$', 'i')
    }
    this.allow = config.allow || {}
  }

  async authorise (ctx, next) {
    if (!this.allowFn(ctx)) {
      await Authorise(this, ctx, next)
    }
  }

  async grant (ctx, next) {
    Grant(this, ctx.req, ctx.res, next)
  }

  allowFn (ctx) {
    let allowedIsArray = Array.isArray(this.allow)
    let allowCache = allowedIsArray ? false : {}
    let method = ctx.method.toLowerCase()
    let allow = allowedIsArray ? allowCache : allowCache[method]

    // Build allow object this method if haven't yet already
    if (!allow) {
      let paths = Array.isArray(this.allow) ? this.allow : Array.prototype.concat(this.allow.all || [], this.allow[method] || [])

      allow = {
        len: paths.length,
        regex: new RegExp('^(' + paths.join('|') + ')$')
      }

      if (allowedIsArray) {
        allowCache = allow
      } else {
        allowCache[method] = allow
      }
    }
    if (allow.len && ctx.path.match(allow.regex)) {
      return true
    }
    return false
  }
}

module.exports = OAuth2Server