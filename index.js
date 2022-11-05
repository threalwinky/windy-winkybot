        

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
const { REST, Routes } = require('discord.js');

const { DisTube } = require('distube')
const fs = require('fs')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')


client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({
        emitEventsAfterFetching: true
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ]
})
//set dir


const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'play',
        description: 'Plays a song',
    }
];

const rest = new REST({ version: '10' }).setToken(process.env['TOKEN']);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands("1035866350758920203"), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity(`with ${client.guilds.cache.size} guild(s)`);
});
client.on('messageCreate', async message => {
    const { prefix } = require('./config.json')
    
    if (message.content.toLowerCase().startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(' ')
        const cmd = args.shift().toLowerCase()
        if (cmd === 'ping') message.reply(`🏓 Pong !!! Your ping is *${client.ws.ping}*`)
        else if (cmd === 'say'){
            if (message.deletable) message.delete()
            message.channel.send(args.join(' '))
        }
        else if (cmd === 'avatar'){
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
            const avatarURL = member.displayAvatarURL({
                format : 'png',
                size : 4096,
                dynamic : true,
            })
            const embed = new EmbedBuilder()
                .setImage(avatarURL)
                .setTitle(`Here is what you want, onii-chan`)
                .setColor('Green')
            message.reply({ embeds : [embed] })
        }
        else if (cmd === 'play'){
            const string = args.join(' ')
            if (!string) return message.react('❌') && message.channel.send(`\`Please enter a song url or query to search.\``)
            client.distube.play(message.member.voice.channel, string, {
                member: message.member,
                textChannel: message.channel,
                message
            })
        }
    }

})
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'ping') {
        await interaction.reply(`🏓Pong !!! \`${client.ws.ping} ms\``);
    }
    else if (interaction.commandName === 'play') {

    }
});
  
client.login(process.env['TOKEN']);