        
require("dotenv").config()
const { Client, GatewayIntentBits, Partials, messageLink , EmbedBuilder } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [
        Partials.Channel,
        Partials.User,
        Partials.Role,
        Partials.Emoji,
        Partials.Invite,
        Partials.Message,
        Partials.GuildMember,
        Partials.ThreadMember,
        Partials.StageInstance,
        Partials.ThreadChannel,
    ]
})
const { TOKEN } = process.env.TOKEN

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity(`with ${client.guilds.cache.size} guild(s)`)

})
client.on('messageCreate', async message => {
    const { prefix } = "w!"
    
    if (message.content.toLowerCase().startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(' ')
        const cmd = args.shift().toLowerCase()
        if (cmd === 'ping') message.reply(`🏓 Pong !!! Your ping is *${client.ws.ping}*`)
    }
})

client.login(TOKEN)