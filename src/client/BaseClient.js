const EventEmitter = require("events");

/**
 * @extends EventEmitter
 */
class BaseClient extends EventEmitter {
    constructor() {
        super()
    }
}

module.exports = BaseClient