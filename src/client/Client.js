const api = require('../rest/api');
const { fetch } = require('rovel.js');
const ClientBot = require('../structures/ClientBot');
const { Events, API_ERROR_PREFIX, PROTOCOL, BASE_HOST, API_PATH } = require('../constants');
const BaseClient = require('./BaseClient');

const ClientEvents = {
 ready: ['string'],
 vote: ['string']
};

/**
 * @extends BaseClient
 */
class Client extends BaseClient {
 constructor(bot, args) {
  super();
  //Check Whether the client is real or not.
  if (typeof (bot?.login || bot?.connect) != "function") {
   console.log(`${API_ERROR_PREFIX} Instance of Discord.js or Eris Client not given in arguments.`);
   if (typeof (args) == "object") {
    this.args = args;
   }
   process.exit(1);
  }
  bot.on('guildCreate', (guild) => {
   //discord.js or eris.
   this.bot.postServers(bot.guilds.cache.size || bot.guilds.size);
  });
  bot.on('guildDelete', (guild) => {
   //discord.js or eris.
   this.bot.postServers(bot.guilds.cache.size || bot.guilds.size);
  });
  /**
   * KEEP THIS PRIVATE
   * @type {string}
   */
  this.code = null;

  /**
   * @type {ClientBot}
   */
  this.bot = null;

  /**
   * @type {Discord.Client || Eris.Client}
   */
  this.client = bot;

  this.api = api;

  /**
   * @type {Array}
   */
  this.votes = (this.args.cacheVotes == true) ? [] : null;

  /**
    * @type {Number}
    */
  this.currentVotes = 0;
 }

 /**
  *
  * @param {string} code
  * @returns {Promise<ClientBot>}
  */
 login(code) {
  return new Promise((resolve, reject) => {
   api.bots.fetchBotFromCode(code).then(data => {
    this.bot = new ClientBot(this, data);
    this.currentVotes = this.bot.votes;
    this.client.on('ready', () => {
     if (this.bot.id != this.client.user.id) {
      console.log(`${API_ERROR_PREFIX} Bot Data doesn't match Client data.\nReporting this to RDL support team and the owners of ${this.client.user.username} bot immediately!`);
      fetch(`${PROTOCOL}://${BASE_HOST}/${API_PATH}/bots/report?leaked=${code}`).then(() => {
       process.exit(1);
      });
     }
    });
    this.code = code;
    this.emit(Events.CLIENT_READY);
    resolve(this.bot);
   })
    .catch(e => reject(e.stack));
  });
 }

 /**
  * If express is not found, returns `null`
  * @requires express
  * @returns
  */
 webhooks() {
  try {
   var express = require('express');
  } catch { }

  if (!express) return;
  const router = express.Router();

  router.use(express.json('*/*'));

  router.post('/', (req, res) => {
   if (!req.query.code) return res.status(401).json({ err: 'no_code' });
   else {
    if (req.query.code !== this.code) return res.status(401).json({ err: 'invalid_code' });
    else {
     this.emit('vote', req.body);
     if (this.args.cacheVotes) {
      this.votes.push({ at: new Date(), user: req.body.user, votes: req.body.votes, coins: req.body.coins });
      if (typeof this.args.clearVotesAt == "number") setTimeout(() => {
       this.votes.shift();
      }, this.args.clearVotesAt);
     }
     this.currentVotes = req.body.currentVotes;
     res.json({ ok: "true" });
    }
   }
  });

  return router;
 }

 /**
  *
  * @param {keyof ClientEvents} event
  */
 on(event, ...listeners) {
  return super.on(event, ...listeners);
 }
}

module.exports = Client;
