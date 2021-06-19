class BaseError extends Error {
    /**
    * @class BaseError
    * @constructor
    * @private
    * @param  {String} code Error code
    * @param  {String} message Error message
    */
    constructor(code, message) {
        super(message)
        this.code = code
    }

    toJSON() {
        return {
            code: this.code,
            message: this.message
        }
    }
}

exports.BaseError = BaseError

exports.FatalError = class FatalError extends BaseError {
    /**
    * Represents a fatal error from the Client : `"FatalError"`.
    * @extends BaseError
    * @constructor
    * @param  {String|Error} error Error object or message
    */
    constructor(error) {
        const errObject = (typeof error == 'string') ? null : error
        const message = errObject ? errObject.message : error
        super('FatalError', message)
        if (errObject) {
            this.stack = errObject.stack
        }
    }
}

exports.APIError = class APIError extends BaseError {
    /**
    * Represents an error from the API : `"APIError"`.
    * @extends BaseError
    * @constructor
    * @param  {String|Error} error Error message
    * @param  {String} status Status code of the request
    * @param  {String} method Method used for the request
    * @param  {String} url Url of the request to the endpoint
    */
    constructor(error, status, method, url) {
        const errObject = (typeof error == 'string') ? null : error
        const message = errObject ? errObject.message : error
        super('APIError', message)
        this.status = status
        this.method = method
        this.url = url
    }
}

exports.ParseError = class ParseError extends BaseError {
    /**
     * Represents a parsing error : `"ParseError"`.
     * @class ParseError
     * @constructor
     * @param  {String} message Error message
     * @param  {http.IncomingMessage} response Server response
     */
    constructor(message, response) {
      super('ParseError', message)
      this.response = response
    }
  }