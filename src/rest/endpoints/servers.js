const { fetch } = require('rovel.js');
const constants = require('../../constants');
const Util = require('../../util/Util');

const ENDPOINT = `${constants.PROTOCOL}://${constants.BASE_HOST}/${constants.API_PATH}/servers`;

module.exports = {
    fetch: async id => {
        return fetch(`${ENDPOINT}/${id}`, {
            headers: { 'user-agent': Util.resolveUserAgent() }
        })
            .then(async r => await r.json())
            .then(d => {
                if (d.err) throw Util.makeApiError(d.err);
                return d;
            });
    },
    fetchAll: async () => {
        return fetch(`${ENDPOINT}`, {
            headers: { 'user-agent': Util.resolveUserAgent() }
        })
            .then(async r => await r.json())
            .then(d => {
                if (d.err) throw Util.makeApiError(d.err);
                return d;
            });
    },
    fetchInvite: async id => {
        return fetch(`${ENDPOINT}/${id}/invite`, {
            headers: { 'user-agent': Util.resolveUserAgent() }
        })
            .then(async r => await r.json())
            .then(d => {
                if (d.err) throw Util.makeApiError(d.err);
                return d;
            });
    }
};
