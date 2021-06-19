const WS = require("ws")
const EventEmitter = require("events")

exports.WebSocket = class WebSocket extends EventEmitter {

    constructor(gateway){
       super()
       this.gateway = gateway
    }

    start(uuid) {
        const ws = new WS(this.gateway)
        ws.on('open', function open() {
            ws.send(40)
            //console.log("Sent:", 40)
        })

        ws.on('message', function incoming(event) {
            var first, op
            var data = {}
            //console.log(event)
            if (event.includes("{") || event.includes("[")) {
                first = Math.min(event.indexOf("{") == -1 ? 100 : event.indexOf("{"), event.indexOf("[") == -1 ? 100 : event.indexOf("["))
                op = parseInt(event.slice(0, first))
                event = JSON.parse(event.slice(first))
                data = Array.isArray(event) ? Object.fromEntries([event]) : event
            } else {
                op = parseInt(event)
            }
            data.op = op
            //console.log("Received:", data)
            switch (data.op) {
                case 40:
                    var res = `${42}["join_account","${uuid}"]`
                    ws.send(res)
                    //console.log("Sent:", res)
                case 2:
                    ws.send(3)
                    //console.log("Sent:", 3)
                    break
                case 42:
                    switch (Object.keys(data)[0]) {
                        case "hr_worker":
                            this.emit("worker", data)
                            break
                        case "stats_paid":
                            this.emit("total_paid", data)
                            break
                        case "stats_workers":
                            this.emit("total_workers", data)
                            break
                        case "payment_status":
                            this.emit("payment_status", data)
                            break
                        case "reward":
                            this.emit("reward", data)
                            break
                        case "refresh":
                            this.emit("refresh", data)
                            break
                        case "stats_ethash_last_reward":
                            this.emit("ethash_last_reward", data)
                            break
                        case "stats_etchash_last_reward":
                            this.emit("etchash_last_reward", data)
                            break
                        case "stats_randomx_last_reward":
                            this.emit("randomx_last_reward", data)
                            break
                        case "stats_x16rv2_last_reward":
                            this.emit("x16rv2_last_reward", data)
                            break
                    }
                    break
            }
        }.bind(this))
    }
}