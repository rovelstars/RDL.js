const constants = require('../constants');

class Util {
 constructor() {
  throw Util.makeError('Util class must not be called');
 }

 /**
  *
  * @param {string} message
  * @returns {Error}
  */
 static makeError(message) {
  return new Error(`${constants.ERROR_PREFIX} ${message}`);
 }

 /**
  *
  * @param {string} message
  * @returns {Error}
  */
 static makeApiError(message) {
  return new Error(`${constants.API_ERROR_PREFIX} ${message}`);
 }

 static resolveUserAgent() {
  const pkg = require('../../package.json');
  return `${pkg.name} (Platform/${require('os').platform()}; RDL.js/${pkg.version}; Node.js/${process.version});`;
 }
}

module.exports = Util;