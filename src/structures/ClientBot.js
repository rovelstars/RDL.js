const Client = require("../client/Client")
const api = require("../rest/api")
const Util = require("../util/Util")
const Bot = require("./Bot")

/**
 * @extends Bot
 */
class ClientBot extends Bot {
    /**
     *
     * @param {Client} client
     * @param {*} data
     */
    constructor(client, data) {
        super(client, data)

        this._id = data._id
    }

    /**
     *
     * @param {number} number
     * @returns
     */
    async postServers(number) {
        if (!number) throw Util.makeError("number argument must be specified")
        return api.bots.postServers(this.id, this.client.code, number)
    }

    /**
     *
     * @param {string} imgUrl
     * @param {string} title
     * @param {string} msg
     * @returns
     */
    async updateCard(imgUrl, title, msg) {
        if (!imgUrl || !title || !msg) throw Util.makeError("updateCard must have all 3 arguments specified")
        return api.bots.updateCard(this.id, this.client)
    }
}

module.exports = ClientBot