const io = require("socket.io-client");
const EventEmitter = require("events");

exports.WebSocket = class WebSocket extends EventEmitter {
    constructor(gateway) {
        super();
        this.gateway = gateway;
    }

    start(uuid) {
        const socket = io(this.gateway, { path: "/", transports: ["websocket"] });

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
            this.emit("total_paid", { total: parseFloat(data) });
        });

        socket.on("stats_workers", (data) => {
            this.emit("total_workers", { total: data });
        });

        socket.on("payment_status", (data) => {
            console.log("payment_status", data);
            this.emit("payment_status", data);
        });

        socket.on("reward", (data) => {
            this.emit("reward", data);
        });

        socket.on("refresh", (data) => {
            this.emit("refresh", data);
        });

        socket.on("stats_ethash_last_reward", (data) => {
            this.emit("ethash_last_reward", { timestamp: data });
        });

        socket.on("stats_etchash_last_reward", (data) => {
            this.emit("etchash_last_reward", { timestamp: data });
        });

        socket.on("stats_randomx_last_reward", (data) => {
            this.emit("randomx_last_reward", { timestamp: data });
        });

        socket.on("stats_x16rv2_last_reward", (data) => {
            this.emit("x16rv2_last_reward", { timestamp: data });
        });
    }
};
