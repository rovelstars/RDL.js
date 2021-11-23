# Rovel Discord List SDK for Node.js - RDL.js

> Using sdk for your discord bots has never been easier! 👀

## Features:
- 👑 Auto post server stats when joining/leaving guilds
- 🔗 Doesn't uses a lot of internet data (as compared with other bot devs not using our sdk)
- ⛷️ fast enough (logins faster to RDL than your bot logging to discord)
- 🎏 lightning fast
- in-built caching for votes (can be turned on/off)

---
> Get your Bot code (API token for bots to connect to RDL) at:

`https://discord.rovelstars.com/api/bots/(your bot id)/code`

---

## Using with Discord.js (Or eris)

**Do NOT copy as is!**
*Learn what's going on here!*

```js
const { Client: DiscordClient } = require('discord.js');
const { Client: RDLClient } = require('rdl.js');

const client = new DiscordClient();
const args = {
  cacheVotes: true || false,
  //whether to use the inbuilt js caching system or not for votes. Can be found at RDL.votes (array) if true.
  
  clearVotesAt: Number,
  //in milliseconds (ms), removes the cached vote data once the ms time hits. Please use this if you don't want to have a memoryleak with votes caching system
}
const RDL = new RDLClient(client, args); //discord bot (eris or djs) instance as argument to automatically publish server stats.

client.once('ready', () => {
    console.log('Discord client is ready!');
});

// Event emitted after login is successful.
RDL.once('ready', () => {
    // Bot data will be available from RDL.bot
    console.log(`RDL Logged in as ${RDL.bot.tag}`);
});

// Example - webhook server using express
let express = require('express');
let app = express();
app.use('/rdl', RDL.webhooks());

// once you have used the above webhook server, you can listen for vote events now!

RDL.on('vote', (obj)=>{
  console.log(`${obj.user.tag} just voted with R$${obj.votes}`);
  console.log(`Bot now has ${RDL.totalVotes}!`);
}); //easy rewarding for your users!

client.login('Your Discord Bot Token');
RDL.login('Your RDL bot code').catch(e => console.error('Error Occurred! ' + e));
```

# Want to checkout all the types for RDL client?
> Checkout them at `src/client/Client.js`
