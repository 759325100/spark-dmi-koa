/**
 * CORS middleware
 *
 * @param {Object} [options]
 * @return {GeneratorFunction}
 * @api public
 */
class Cors {
  constructor (options) {
    this.options = options || {}

    this.defaults = {
      origin: true,
      methods: 'GET,HEAD,PUT,POST,DELETE'
    }

    // Set defaults
    for (let key in this.defaults) {
      if (!this.options.hasOwnProperty(key)) {
        this.options[key] = this.defaults[key]
      }
    }

    // Set expose
    if (Array.isArray(this.options.expose)) {
      this.options.expose = this.options.expose.join(',')
    }

    // Set maxAge
    if (typeof this.options.maxAge === 'number') {
      this.options.maxAge = this.options.maxAge.toString()
    } else {
      this.options.maxAge = null
    }

    // Set methods
    if (Array.isArray(this.options.methods)) {
      this.options.methods = this.options.methods.join(',')
    }

    // Set headers
    if (Array.isArray(this.options.headers)) {
      this.options.headers = this.options.headers.join(',')
    }
  }

  init () {
    const that = this
    return async function (ctx, next) {
      let origin

      if (typeof that.options.origin === 'string') {
        origin = that.options.origin
      } else if (that.options.origin === true) {
        origin = ctx.get('origin') || '*'
      } else if (that.options.origin === false) {
        origin = that.options.origin
      } else if (typeof that.options.origin === 'function') {
        origin = that.options.origin(ctx.request)
      }

      if (origin === false) return

      ctx.set('Access-Control-Allow-Origin', origin)

      /**
       * Access Control Expose Headers
       */
      if (that.options.expose) {
        ctx.set('Access-Control-Expose-Headers', that.options.expose)
      }

      /**
       * Access Control Max Age
       */
      if (that.options.maxAge) {
        ctx.set('Access-Control-Max-Age', that.options.maxAge)
      }

      /**
       * Access Control Allow Credentials
       */
      if (that.options.credentials === true) {
        ctx.set('Access-Control-Allow-Credentials', 'true')
      }

      /**
       * Access Control Allow Methods
       */
      ctx.set('Access-Control-Allow-Methods', that.options.methods)

      /**
       * Access Control Allow Headers
       */
      let headers

      if (that.options.headers) {
        headers = that.options.headers
      } else {
        headers = ctx.get('access-control-request-headers')
      }

      if (headers) {
        ctx.set('Access-Control-Allow-Headers', headers)
      }

      /**
       * Returns
       */
      if (ctx.method === 'OPTIONS') {
        ctx.status = 204
      } else {
        await next()
      }
    }
  }
}

module.exports = Cors
