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

const error = require('./error')

module.exports = Authorise

/**
 * Authorise
 *
 * @param {Object}   config Instance of OAuth object
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
async function Authorise (config, ctx, next) {
  this.config = config
  this.model = config.model
  this.req = ctx.request
  let err = getBearerToken(this.req)
  if (err) {
    // 直接响应
    throw (err)
  } else {
    let err = await checkToken()
    if (err) {
      throw (err)
    }
  }
}

/**
 * Get bearer token
 *
 * Extract token from request according to RFC6750
 *
 * @param  {Function} done
 * @this   OAuth
 */
function getBearerToken (req) {
  let headerToken = req.get('Authorization') ? req.get('Authorization') : undefined
  let getToken = req.query.access_token
  let postToken = req.body ? this.req.body.access_token : undefined

  // Check exactly one method was used
  let methodsUsed = (headerToken !== undefined) + (getToken !== undefined) + (postToken !== undefined)

  if (methodsUsed > 1) {
    return error('invalid_request',
      'Only one method may be used to authenticate at a time (Auth header,  ' +
      'GET or POST).')
  } else if (methodsUsed === 0) {
    return error('invalid_request', 'The access token was not found')
  }

  // Header: http://tools.ietf.org/html/rfc6750#section-2.1
  if (headerToken) {
    let matches = headerToken.match(/Bearer\s(\S+)/)

    if (!matches) {
      return error('invalid_request', 'Malformed auth header')
    }

    headerToken = matches[1]
  }

  // POST: http://tools.ietf.org/html/rfc6750#section-2.2
  if (postToken) {
    if (req.method === 'GET') {
      return error('invalid_request',
        'Method cannot be GET When putting the token in the body.')
    }

    if (req.is('application/x-www-form-urlencoded')) {
      return error('invalid_request', 'When putting the token in the ' +
        'body, content type must be application/x-www-form-urlencoded.')
    }
  }

  this.bearerToken = headerToken || postToken || getToken
  return null
}

/**
 * Check token
 *
 * Check it against model, ensure it's not expired
 * @param  {Function} done
 * @this   OAuth
 */
async function checkToken () {
  const self = this
  try {
    let token = await this.model.getAccessToken(this.bearerToken)
    if (!token) {
      return error('invalid_token',
        'The access token provided is invalid.')
    }
    if (token.expires !== null &&
      (!token.expires || token.expires < new Date())) {
      return error('expired_grant',
        'The access token provided has expired.')
    }

    // Expose params
    self.req.oauth = {bearerToken: token}
    self.req.user = token.user ? token.user : {id: token.userId}
  } catch (err) {
    return error('server_error', false, err)
  }
}
