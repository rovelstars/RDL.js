const {
    fetch
} = require("rovel.js")
const constants = require("../../constants");
const Util = require("../../util/Util");

const ENDPOINT = `${constants.PROTOCOL}://${constants.BASE_HOST}/${constants.API_PATH}/bots`

module.exports = {
    fetch: async (id) => {
        return fetch(`${ENDPOINT}/${id}`)
            .then(async r => await r.json())
            .then(d => {
                if (d.err) throw Util.makeApiError(d.err)
                return d
            });
    },
    fetchApiCode: async (id, userKey) => {
        return fetch(`${ENDPOINT}/${id}/apiKey?key=${userKey}`)
            .then(async r => await r.json())
            .then(d => {
                if (d.err) throw Util.makeApiError(d.err)
                return d
            });
    },
    fetchAll: async () => {
        return fetch(`${ENDPOINT}`)
            .then(async r => await r.json())
            .then(d => {
                if (d.err) throw Util.makeApiError(d.err)
                return d
            });
    },
    fetchBotFromCode: async (code) => {
        return fetch(`${ENDPOINT}/info?code=${code}`)
            .then(async r => await r.json())
            .then(d => {
                if (d.err) throw Util.makeApiError(d.err)
                return d
            })
    },
    postServers: async (id, code, serverCount) => {
        return fetch(`${ENDPOINT}/${id}/servers?code=${code}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    count: serverCount
                })
            })
            .then(async r => await r.json())
            .then(d => {
                if (d.err) throw Util.makeApiError(d.err)
                return d
            })
    },
    updateCard: async (id, code, imgUrl, title, msg) => {
        return fetch(`https://discord.rovelstars.com/api/bots/${id}/card?code=${code}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                img: imgUrl,
                title: title,
                msg: msg
            })
        })
        .then(async r => await r.json())
        .then(d => {
            if (d.err) throw Util.makeApiError(d.err)
            return d
        })
    }
}