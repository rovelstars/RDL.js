const constants = require("../constants");

class Util {
    constructor() {
        throw Util.makeError("Util class must not be called")
    }

    /**
     *
     * @param {string} message
     * @returns {Error}
     */
    static makeError(message) {
        return new Error(`${constants.ERROR_PREFIX} ${message}`)
    }

    /**
     *
     * @param {string} message
     * @returns {Error}
     */
    static makeApiError(message) {
        return new Error(`${constants.API_ERROR_PREFIX} ${message}`)
    }
}

module.exports = Util