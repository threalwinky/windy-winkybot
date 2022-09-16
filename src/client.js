
const {Client, GatewayIntentBits, Partials, MessageEmbed} = require('discord.js')
const client = new Client({
  intents: 47007,
  partials: [Partials.Channel],
});
module.exports = {
    wbot: client,
};