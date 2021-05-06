# Rovel Discord List SDK for Node.js - RDL.js
> Using sdk for your discord bots has never been easier! 👀

---

## Using with Discord.js

```js
const Discord = require("discord.js");
const client = new Discord.Client();
let RDL = require("rdl.js");

client.once("ready",()=>{
 console.log("ready!");
});

//Event emitted after login is successful. Returns an object of your bot that is in our database.
RDL.once("login",bot=>{
 console.log(`[RDL] Logined as ${bot.tag}`);//you can get the bot object from now on by RDL.client
});

//now see an example - post server stats when bot joins a guild, you can even post stats when bot leaves guild.
client.on("guildCreate",(guild)=>{
 RDL.emit("postServers", (client.guilds.cache.array().length));
});

//time for making a webhook server using express!
let express = require("express");
let app = express();
app.use(RDL.server, "/api"); // "/api" is the base url. if you already have a dashboard with your bot, this might be a right choice. But if you just want webhooks and don't have any dashboard or anything like that, use the below code
/*
app.use(RDL.server);
*/

client.login("Your Discord Bot Token");
RDL.login("Your RDL bot token").catch(e=>console.log("Error Occurred! "+e));//e is a string
```