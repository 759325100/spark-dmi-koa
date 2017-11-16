/**
 * OAuth2认证需要的model，参考 http://oauth2-server.readthedocs.io/en/latest/model/spec.html
 */

const fmt = require('util').format

class OAuth {
  constructor (redis) {
    this.redis = redis
    this.formats = {
      client: 'clients:%s',
      token: 'tokens:%s',
      user: 'users:%s'
    }
  }

  /**
   * Get access token.
   */
  async getAccessToken (bearerToken) {
    let token = await this.redis.get(fmt(this.formats.token, bearerToken))

    if (!token) {
      return
    }
    token = JSON.parse(token)
    return {
      accessToken: token.token,
      clientId: token.client_id,
      expires: token.expires,
      userId: token.user_id
    }
  }

  /**
   * Get refresh token.
   */
  async getRefreshToken (bearerToken) {
    var token = await this.redis.get(fmt(this.formats.token, bearerToken))

    if (!token) {
      return
    }

    return {
      clientId: token.client_id,
      expires: token.expires,
      refreshToken: token.token,
      userId: token.user_id
    }
  }

  /**
   * Get user.
   */
  async getUser (username, password) {
    let user = await this.redis.get(fmt(this.formats.user, username))

    if (!user || password !== user.password) {
      return
    }

    return {
      id: username
    }
  }

  async saveToken (token, client, user) {
    let data = {
      user_id: user.id,
      client_id: client.id,
      token: token.accessToken,
      expires: token.accessTokenExpiresAt,
      _id: token.accessToken
    }

    await this.redis.set(fmt(this.formats.token, token.accessToken), data)

    return data
  };
}

module.exports = OAuth