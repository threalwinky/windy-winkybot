const dotenv = require ("dotenv")
const fs = require('fs')
const keepAlive = require("./server")
const {
    Discord,
    Client,
    AttachmentBuilder,
    EmbedBuilder,
    GatewayIntentBits,
    Collection,
    Partials,
    ActivityType,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder,
    REST,
    Routes,
    SlashCommandBuilder
} = require('discord.js');
const moment = require('moment')

dotenv.config()

const client = new Client({
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageTyping,
    ],

});

const TOKEN = process.env.TOKEN
const prefix = process.env.prefix
const SERVER_ID = process.env.SERVER_ID

const rest = new REST({ version: '10' }).setToken(TOKEN)
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// const commands = [];
client.commands = new Collection();
// for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);
//     commands.push(command.data.toJSON());
//     client.commands.set(command.data.name, command);
// }
const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());
// console.log(commands)
// const commands = [
//     {
//         name: 'ping',
//         description: 'Replies with Pong!',
//     },
//     {
//         name: 'play',
//         description: 'Plays a song',
//     }
// ];
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity(`with ${client.guilds.cache.size} guild(s)`);
});

client.on('messageCreate', async message => {
    if (message.content.toLowerCase().startsWith(prefix)){
        const args = message.content.split(prefix)
        const cmd = args[1]
        if (cmd.startsWith("ping")){
            message.channel.send("Pong")
        }
        else if (cmd.startsWith("say")){
            // console.log(message)
            // message.channel.reply("OK")
            // console.log(args[1])
            const say = args[1].split("say ")[1]
            message.reply(say);
        }
    }
})

client.once('ready', () => {

    const CLIENT_ID = client.user.id;
    (async () => {
        try {
          console.log('Started refreshing application (/) commands.');
      
          await rest.put(Routes.applicationGuildCommands("1284204848031465492", SERVER_ID), { body: commands });
      
          console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
          console.error(error);
        }
      })();

})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});
keepAlive()
client.login(TOKEN);