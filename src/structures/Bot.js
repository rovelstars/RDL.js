const Client = require('../client/Client');

class Bot {
 /**
  *
  * @param {Client} client
  * @param {*} data
  */
 constructor(client, data) {
  this.client = client;

  /**
   * @type {string}
   */
  this.owners = data.owners;

  /**
   * @type {boolean}
   */
  this.verified = data.verified;

  /**
   * @type {boolean}
   */
  this.added = data.added;

  /**
   * @type {boolean}
   */
  this.promoted = data.promoted;

  /**
   * @type {number}
   */
  this.votes = data.votes;

  /**
   * @type {Array<string>}
   */
  this.badges = data.badges;

  /**
   * @type {string}
   */
  this.id = data.id;

  /**
   * @type {string}
   */
  this.username = data.username;

  /**
   * @type {string}
   */
  this.discriminator = data.discriminator;

  /**
   * @type {string}
   */
  this.avatar = data.avatar;

  /**
   * @type {string}
   */
  this.short = data.short;

  /**
   * @type {string}
   */
  this.desc = data.desc;

  this.prefix = data.prefix;

  /**
   * @type {string}
   */
  this.lib = data.lib;

  /**
   * @type {string}
   */
  this.support = data.support;

  /**
   * @type {string}
   */
  this.invite = data.invite;

  /**
   * @type {Array<string>}
   */
  this.servers = data.servers;

  /**
   * @type {string}
   */
  this.avatarURL = data.avatarURL;

  /**
   * @type {string}
   */
  this.tag = data.tag;

  /**
   * @type {string}
   */
  this.timestamp = data.timestamp;
 }
}

module.exports = Bot;