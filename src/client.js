const axios = require('axios').default
const errors = require('./errors')
const EventEmitter = require('events')
const { WebSocket } = require("./websocket")

exports.Client = class Client extends EventEmitter {

    constructor() {
      super()

      /**
      * The base API Url
      * @type {String}
      */
      this.baseApiUrl = "https://api.unmineable.com"

      /**
      * The WebSocket Url
      * @type {String}
      */
      this.webSocketUrl = "wss://ws.unminable.com/?EIO=4&transport=websocket"
    }

    /**
    * Build url to the API
    * @param  {String} path - API endpoint
    * @return {String} url
    * @private
    */
    #buildURL(version, path) {
      return `${this.baseApiUrl}/${version}/${path}`
    }

    /**
    * Make request against the API
    * @param  {String} method - request method
    * @param  {String} path - API endpoint
    * @param  {Object} options - request options
    * @return {Promise} promise
    * @private
    */
    #request(version, path, options = {}) {
      options.url = options.url ? options.url : this.#buildURL(version, path)
      options.headers = {
          "User-Agent": `UnMineable.js ${require("../package.json").version} (https://github.com/LockBlock-dev/unmineable.js)`,                  
          "Content-Type": "application/json",
          "Accept-Encoding": "UTF8",
      }
      //options.data ? options.data : null

      return axios(options)
      .then(response => {
        if (typeof(response.data) === "object") {
          return response.data
        } else {
          try {
            const data = JSON.parse(response.data)
            if (data.ok) {
              return data.result
            }
          } catch (err) {
            throw new errors.ParseError(`Error parsing response: ${response.data}`, response)
          }
        }
      })
      .catch(error => {
        throw new errors.APIError(error, error.response.status, options.method, options.url)
      })
    }

    //----- WS ------

    /**
    * Start the WebSocket.
    * @param {String} uuid - uuid: can be found in client.web.wallet()
    * @example start("0cc5691e-cedb-11eb-b8bc-0242ac130003")
    */
    start(uuid) {
      const ws = new WebSocket(this.webSocketUrl)

      ws.start(uuid)

      ws.on("worker", (data) => {
        this.emit("worker", data)
      })

      ws.on("total_paid", (data) => {
        this.emit("total_paid", data)
      })

      ws.on("total_workers", (data) => {
        this.emit("total_workers", data)
      })

      ws.on("payment_status", (data) => {
        this.emit("payment_status", data)
      })

      ws.on("reward", (data) => {
        this.emit("reward", data)
      })

      ws.on("refresh", (data) => {
        this.emit("refresh", data)
      })

      ws.on("ethash_last_reward", (data) => {
        this.emit("ethash_last_reward", data)
      })

      ws.on("etchash_last_reward", (data) => {
        this.emit("etchash_last_reward", data)
      })

      ws.on("randomx_last_reward", (data) => {
        this.emit("randomx_last_reward", data)
      })

      ws.on("x16rv2_last_reward", (data) => {
        this.emit("x16rv2_last_reward", data)
      })
    }

    //----- WEB API ------

    /**
    * Get the web properties.
    * @example client.web
    * @return {Object}
    */
    web = {

      /**
      * Get the pool status.
      * @example status()
      * @return {Promise} promise
      */
      stats: () => {
        return this.#request("v3", "stats", {method: "GET"})
      },

      /**
      * Get all pool coins.
      * @example coins()
      * @return {Promise} promise
      */
      coins: () => {
        return this.#request("v3", "coins", {method: "GET"})
      },

      /**
      * Get a coin info.
      * @param {String} coin - coin symbol
      * @param {Boolean} [more=false] - show more infos: payment info + rewards
      * @example coin("ETH")
      * @return {Promise} promise
      */
      coin: (coin, more) => {
        var path = more ? `coins/${coin}?winfo=1` : `coins/${coin}`
        return this.#request("v3", path, {method: "GET"})
      },

      /**
      * Get the website version.
      * @example version()
      * @return {Promise} promise
      */
      version: () => {
        return this.#request("v3", "site/version", {method: "GET"})
      },

      /**
      * Get the pool news.
      * @example news()
      * @return {Promise} promise
      */
      news: () => {
        return this.#request("v3", "site/notice?site=start", {method: "GET"})
      },

      /**
      * Get a wallet stats.
      * @param {String} address - wallet address
      * @param {String} coin - coin symbol
      * @example wallet("0xfd2D76F7Cf04863F2B221E56Af6fF94105EC2e5e", "ETH")
      * @return {Promise} promise
      */
      wallet: (address, coin) => {
        return this.#request("v3", `stats/${address}?coin=${coin}`, {method: "GET"})
      },

      /**
      * Get a coin payouts.
      * @param {String} uuid - uuid: can be found in client.web.wallet()
      * @param {Number} [page=1] - payouts page
      * @example payouts("0cc5691e-cedb-11eb-b8bc-0242ac130003", 1)
      * @return {Promise} promise
      */
      payouts: (uuid, page) => {
        return this.#request("v3", `stats/${uuid}/payouts?page=${page}`, {method: "GET"})
      },

      /**
      * Get calculated reward for a coin.
      * @param {String} algo algorithms:
      * - ethash
      * - etchash
      * - x16rv2 (kawpow)
      * - randomx
      * @param {String} coin - coin symbol
      * @link list of coins here: https://unmineable.com/coins
      * @param {Number} hashrate - hashrate for this algorithm
      * - ethash, etchash, x16rv2: MH/s
      * - randomx: H/s
      * @example calculate("ethash", "DOGE", 30)
      * @return {Promise} promise
      */
      calculate: (algo, coin, hashrate) => {
        return this.#request(null, null, {method: "POST", url: `https://api.unminable.com/v3/calculate/reward`, data: {"algo":algo, "coin":coin, "mh":hashrate}})
      },

      /**
      * Set your auto payment setting for a coin.
      * @param {String} uuid - uuid: can be found in client.web.wallet()
      * @param {Boolean} setting - value of the setting
      * @example setAutoPay("0cc5691e-cedb-11eb-b8bc-0242ac130003", true)
      * @return {Promise} promise
      */
      setAutoPay: (uuid, setting) => {
        return this.#request(null, null, {method: "POST", url: `https://api.unminable.com/v1/address/${uuid}/setting/auto_pay`, data: {"setting":setting}})
      },

      /**
      * Ask a payment for a coin.
      * @param {String} uuid - uuid: can be found in client.web.wallet()
      * @example pay("0cc5691e-cedb-11eb-b8bc-0242ac130003")
      * @return {Promise} promise
      */
      pay: (uuid) => {
        return this.#request(null, null, {method: "POST", url: `https://api.payouts.unmineable.com/v3/address/${uuid}/pay`})
      }
    }

    //----- MINER API ------

    /**
    * Get the miner properties.
    * @example client.miner
    * @return {Object}
    */
    miner = {

      /**
      * Get the miner version.
      * @example version()
      * @return {Promise} promise
      */
      version: () => {
        return this.#request("v2", "miner/version", {method: "GET"})
      },

      /**
      * Get all miner coins
      * @example coins()
      * @return {Promise} promise
      */
      coins: () => {
        return this.#request("v2", "coins", {method: "GET"})
      },

      /**
      * Get a wallet stats.
      * @param {String} address - wallet address
      * @param {String} coin - coin symbol
      * @example wallet("0xfd2D76F7Cf04863F2B221E56Af6fF94105EC2e5e", "ETH")
      * @return {Promise} promise
      */
      wallet: (address, coin) => {
        return this.#request("v2", `app/stats/${address}?coin=${coin}`, {method: "GET"})
      },
    }
}
