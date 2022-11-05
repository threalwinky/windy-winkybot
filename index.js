        
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



client.login(TOKEN)