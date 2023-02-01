const axios = require("axios").default;
const errors = require("./errors");
const EventEmitter = require("events");
const pkg = require("../package.json");

exports.Client = class Client extends EventEmitter {
    constructor() {
        super();

        /**
         * The base API Url
         * @type {String}
         */
        this.API_URL = "https://api.unminable.com";

        /**
         * The payouts API Url
         * @type {String}
         */
        this.API_URL_PAYOUTS = "https://payouts.unmineable.com";

        /**
         * The WebSocket Url
         * @type {String}
         */
        this.WEBSOCKET_URL = "wss://ws.unminable.com";
    }

    /**
     * Make request against the API
     * @param  {String} method request method
     * @param  {String} path API endpoint
     * @param  {Object} [options] request options
     * @return {Promise} promise
     * @private
     */
    #request(method, version, path, options = {}) {
        Object.assign(options, {
            method: method,
            url: options.url ? options.url : `${this.API_URL}/${version}/${path}`,
            headers: {
                "User-Agent": `unmineable.js ${pkg.version} (https://github.com/LockBlock-dev/unmineable.js)`,
                "Content-Type": "application/json",
            },
        });

        return axios(options)
            .then((response) => {
                if (typeof response.data === "object") {
                    return response.data;
                } else {
                    try {
                        let data = JSON.parse(response.data);
                        return data;
                    } catch (err) {
                        throw new errors.ParseError(
                            response.data,
                            response.status,
                            options.method,
                            options.url
                        );
                    }
                }
            })
            .catch((error) => {
                if (error.type == "ParseError") {
                    return error;
                } else {
                    return new errors.APIError(
                        error,
                        error.response,
                        error.response.status,
                        options.method,
                        options.url
                    );
                }
            });
    }

    //----- WS ------

    /**
     * Start the WebSocket.
     * @param {String} uuid uuid
     * @example start("0cc5691e-cedb-11eb-b8bc-0242ac130003")
     */
    start(uuid) {
        const socket = io(this.WEBSOCKET_URL, { path: "/", transports: ["websocket"] });

        socket.on("connect", () => {
            socket.emit("join_account", uuid);
        });

        socket.on("disconnect", (reason) => {
            if (reason === "io server disconnect") {
                // the disconnection was initiated by the server, you need to reconnect manually
                socket.connect();
            }
            // else the socket will automatically try to reconnect
        });

        socket.on("hr_worker", (data) => {
            this.emit("worker", {
                name: data.n,
                reportedHashrate: data.rh,
                calculatedHashrate: data.ch,
                lastShareAt: data.b,
                online: data.o,
            });
        });

        socket.on("stats_paid", (data) => {
            /**
             * Emits the total paid by the pool in BTC.
             * @event Client#total_paid
             * @type {Object}
             * @property {number} total BTC total
             */
            this.emit("total_paid", { total: parseFloat(data) });
        });

        socket.on("stats_workers", (data) => {
            /**
             * Emits the total of active workers on the pool.
             * @event Client#total_workers
             * @type {Object}
             * @property {number} total BTC total
             */
            this.emit("total_workers", { total: data });
        });

        socket.on("payment_status", (data) => {
            this.emit("payment_status", data);
        });

        socket.on("reward", (data) => {
            this.emit("reward", data);
        });

        socket.on("refresh", (data) => {
            this.emit("refresh", data);
        });

        socket.on("stats_ethash_last_reward", (data) => {
            /**
             * Emits when the pool gets a new ethash block reward.
             * @event Client#ethash_last_reward
             * @type {Object}
             * @property {number} timestamp
             */
            this.emit("ethash_last_reward", { timestamp: data });
        });

        socket.on("stats_etchash_last_reward", (data) => {
            /**
             * Emits when the pool gets a new etchash block reward.
             * @event Client#etchash_last_reward
             * @type {Object}
             * @property {number} timestamp
             */
            this.emit("etchash_last_reward", { timestamp: data });
        });

        socket.on("stats_randomx_last_reward", (data) => {
            /**
             * Emits when the pool gets a new randomx block reward.
             * @event Client#randomx_last_reward
             * @type {Object}
             * @property {number} timestamp
             */
            this.emit("randomx_last_reward", { timestamp: data });
        });

        socket.on("stats_x16rv2_last_reward", (data) => {
            /**
             * Emits when the pool gets a new RVN block reward.
             * @event Client#x16rv2_last_reward
             * @type {Object}
             * @property {number} timestamp
             */
            this.emit("x16rv2_last_reward", { timestamp: data });
        });

        socket.on("stats_autolykos_last_reward", (data) => {
            /**
             * Emits when the pool gets a new autolykos block reward.
             * @event Client#autolykos_last_reward
             * @type {Object}
             * @property {number} timestamp
             */
            this.emit("autolykos_last_reward", { timestamp: data });
        });
    }

    //----- WEB API ------

    /**
     * Get the pool stats.
     * @example stats()
     * @return {Promise<Object>} promise
     */
    stats() {
        return this.#request("GET", "v3", "stats");
    }

    /**
     * Get the pool info.
     * @example pool()
     * @return {Promise<Object>} promise
     */
    pool() {
        return this.#request("GET", "v4", "pool");
    }

    /**
     * Get coins list | a coin info.
     * @param {String} [coin] coin symbol
     * @example coin("ETH")
     * @return {Promise<Object>} promise
     */
    coins(coin = "") {
        return this.#request("GET", "v4", `coin/${coin}`);
    }

    /**
     * Get the website | miner version.
     * @param {Object} params query params
     * @param {Object} params.type type:
     * - website
     * - miner
     * @example version({ type: "website" })
     * version({ type: "miner" })
     * @return {Promise<Object>} promise
     */
    version(params = {}) {
        if (params.type == "website") return this.#request("GET", "v3", "site/version");
        if (params.type == "miner") return this.#request("GET", "v3", "miner/version");
    }

    /**
     * Get the pool news.
     * @example news()
     * @return {Promise<Object>} promise
     */
    news() {
        return this.#request("GET", "v3", "site/notice?site=start");
    }

    /**
     * Get a wallet | account info.
     * @param {Object} params query params
     * @param {String} [params.address] wallet address
     * @param {String} [params.uuid] uuid
     * @param {String} [params.coin] coin symbol
     * @example wallet({ address: "0xfd2D76F7Cf04863F2B221E56Af6fF94105EC2e5e", coin: "ETH" })
     * wallet({ uuid: "0cc5691e-cedb-11eb-b8bc-0242ac130003" })
     * @return {Promise<Object>} promise
     */
    wallet(params = {}) {
        if (params.uuid) return this.#request("GET", "v4", `account/${params.uuid}`);
        if (params.address)
            return this.#request("GET", "v4", `address/${params.address}?coin=${params.coin}`);
    }

    /**
     * Get an account stats.
     * @param {String} uuid uuid
     * @example accountStats("0cc5691e-cedb-11eb-b8bc-0242ac130003")
     * @return {Promise<Object>} promise
     */
    accountStats(uuid) {
        return this.#request("GET", "v4", `account/${uuid}/stats`);
    }

    /**
     * Get a coin payouts.
     * @param {String} uuid uuid
     * @param {Object} params query parameters
     * @param {Number} [params.page=1] payouts page
     * @example payouts("0cc5691e-cedb-11eb-b8bc-0242ac130003", { page: 2 })
     * @return {Promise<Object>} promise
     */
    payouts(uuid, params = {}) {
        params = new URLSearchParams(params);
        return this.#request("GET", "v4", `account/${uuid}/payments?${params.toString()}`);
    }

    /**
     * Get your referral code.
     * @param {String} uuid uuid
     * @example referral("0cc5691e-cedb-11eb-b8bc-0242ac130003")
     * @return {Promise<Object>} promise
     */
    referral(uuid) {
        return this.#request("GET", "v4", `account/${uuid}/referrals`);
    }

    /**
     * Get your workers stats.
     * @param {String} uuid uuid
     * @example workers("0cc5691e-cedb-11eb-b8bc-0242ac130003")
     * @return {Promise<Object>} promise
     */
    workers(uuid) {
        return this.#request("GET", "v4", `account/${uuid}/workers`);
    }

    /**
     * Get calculated reward for a coin.
     * @param {Object} body request body
     * @param {String} body.algo algorithms:
     * - ethash
     * - etchash
     * - kawpow
     * - randomx
     * - autolykos
     * @param {String} body.coin coin symbol
     * @param {Number} body.hashrate hashrate for this algorithm
     * - ethash, etchash, x16rv2: MH/s
     * - randomx: H/s
     * @example calculate({ algo: "ethash", coin: "DOGE", hashrate: 30 })
     * @return {Promise<Object>} promise
     */
    calculate(body = {}) {
        body.mh = body.hashrate.toString();
        delete body.hashrate;
        return this.#request("POST", "v3", "calculate/reward", { data: body });
    }

    /**
     * Set settings for a coin (1 at a time).
     * @param {Object} body request body
     * @param {String} body.uuid uuid
     * @param {Boolean} [body.autoPay=false] auto pay setting
     * @param {String} body.network network setting
     * - ETH
     * - BSC
     * - ARBITRUM
     * @example settings({ uuid: "0cc5691e-cedb-11eb-b8bc-0242ac130003", autoPay: true })
     * settings({ uuid: "0cc5691e-cedb-11eb-b8bc-0242ac130003", network: "BSC" })
     * @return {Promise<Object>} promise
     */
    settings(body = {}) {
        if (body.autoPay) {
            return this.#request("POST", "v1", `address/${body.uuid}/setting/auto_pay`, {
                data: { setting: body.autoPay },
            });
        } else if (body.network) {
            return this.#request("POST", null, null, {
                url: `${this.API_URL_PAYOUTS}/v3/address/${body.uuid}/switch?network=${body.network}`,
            });
        }
    }

    /**
     * Ask a payment for a coin.
     * @param {String} uuid uuid
     * @example pay("0cc5691e-cedb-11eb-b8bc-0242ac130003")
     * @return {Promise<Object>} promise
     */
    pay(uuid) {
        return this.#request("POST", null, null, {
            url: `${this.API_URL_PAYOUTS}/v3/address/${uuid}/pay`,
        });
    }
};
