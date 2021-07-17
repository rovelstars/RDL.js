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
 constructor(bot) {
  super();
  //Check Whether the client is real or not.
  if (typeof(bot?.login || bot?.connect) != "function") {
   console.log(`${API_ERROR_PREFIX} Instance of Discord.js or Eris Client not given in arguments.`);
   process.exit(1);
  }
  bot.on('guildCreate', function(guild) {
   //discord.js or eris.
   this.bot.postServers(bot.guilds.cache.size || bot.guilds.size);
  });
  bot.on('guildDelete', function(guild) {
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
   this.votes = [];
   
 }

 /**
  *
  * @param {string} code
  * @returns {Promise<ClientBot>}
  */
 login(code) {
  var that = this;
  return new Promise(function(resolve, reject){
   api.bots.fetchBotFromCode(code).then(function(data){
     that.bot = new ClientBot(that, data);
     that.client.on('ready', function() {
      if (that.bot.id != that.client.user.id) {
       console.log(`${API_ERROR_PREFIX} Bot Data doesn't match Client data.\nReporting this to RDL support team and the owners of ${that.client.user.username} bot immediately!`);
       fetch(`${PROTOCOL}://${BASE_HOST}/${API_PATH}/bots/report?leaked=${code}`).then(function() {
        process.exit(1);
       });
      }
     });
     that.code = code;
     that.emit(Events.CLIENT_READY);
     resolve(that.bot);
    })
    .catch(function(e){ reject(e.stack)});
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
  } catch {}

  if (!express) return;
  const router = express.Router();

  router.get('/', function(req, res) {
   // Ok but why
   res.json({
    status: 'UP' // What about HTTP code 200?
   }).end();
  });

  router.use(express.json('*/*'));

  router.post('/vote', function(req, res) {
   if (!req.query.code) return res.json({ err: 'no_code' });
   else{
   if (req.query.code !== this.code) return res.json({ err: 'invalid_code' });
   else{
   this.emit('vote', req.body);
   this.votes.push({at: new Date(), user: req.body.user, votes: req.body.votes, coins: req.body.coins});
   res.json({ ok: "true" });
   }}
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