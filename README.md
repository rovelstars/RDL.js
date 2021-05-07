# Rovel Discord List SDK for Node.js - RDL.js
> Using sdk for your discord bots has never been easier! 👀

---

## Using with Discord.js

```js
const { Client: DiscordClient } = require("discord.js");
const { Client: RDLClient } = require("rdl.js")

const client = new DiscordClient();
const RDL = new RDLClient();

client.once("ready", () => {
    console.log("Discord client is ready!");
});

// Event emitted after login is successful.
RDL.once("ready", () => {
    // Bot data will be available from RDL.bot
    console.log(`RDL Logged in as ${RDL.bot.tag}`);
})

// Example - post server stats when bot joins a guild
client.on("guildCreate", (guild) => {
    RDL.bot.postServers(client.guilds.cache.size);
});

// Example - webhook server using express
let express = require("express");
let app = express();
app.use("/api", RDL.webhooks());

client.login("Your Discord Bot Token");
RDL.login("Your RDL bot token")
    .catch(e => console.error("Error Occurred! " + e));
```