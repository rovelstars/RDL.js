const api = require("../rest/api");
const ClientBot = require("../structures/ClientBot");
const { Events } = require("../constants");
const BaseClient = require("./BaseClient");

const ClientEvents = {
    ready: ["string"],
    vote: ["string"]
}

/**
 * @extends BaseClient
 */
class Client extends BaseClient {
    constructor() {
        super()
        /**
         * KEEP THIS PRIVATE
         * @type {string}
         */
        this.code = null;

        /**
         * @type {ClientBot}
         */
        this.bot = null;
    }

    /**
     *
     * @param {string} code
     * @returns {Promise<ClientBot>}
     */
    login(code) {
        return new Promise((resolve, reject) => {
            api.bots.fetchBotFromCode(code).then(data => {
                this.bot = new ClientBot(this, data)
                this.code = code
                this.emit(Events.CLIENT_READY)
                resolve(this.bot)
            }).catch(e => reject(e))
        })
    }

    /**
     * If express is not found, returns `null`
     * @requires express
     * @returns
     */
    webhooks() {
        try {
            var express = require("express")
        } catch {}

        if (!express) return
        const router = express.Router()

        router.get("/", (req, res) => { // Ok but why
            res.json({
                status: "UP"  // What about HTTP code 200?
            }).end()
        })

        router.use(express.json("*/*"))

        router.post("/vote", (req, res) => {
            if (!req.query.code) return res.json({ err: "no_code" }).end() // HTTP error 401
            if (req.query.code !== this.code) return res.json({ err: "invalid_code" }).end() // HTTP error 401

            this.emit("vote", req.body) // This is temporary, I need a structure for this

            res.json({ ok: true }).end() // Replace with HTTP error 204
        })

        return router
    }

    /**
     *
     * @param {keyof ClientEvents} event
     */
    on(event, ...listeners) {
        super.on(event, ...listeners)
    }
}

module.exports = Client