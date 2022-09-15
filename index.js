const {Client, MessageEmbed} = require('discord.js')
const client = new Client({
    disableMentions: "everyone",
    restTimeOffset: 0
})
const {token} = require("./config.json")
const {prefix} = require("./config.json")
getCMD = (n) => n.slice(1).toLowerCase()
splitCMD = (n) => n.split(' ')


client.on("ready", () => {
    console.log(client.user.username + " đang hoạt động")
    client.user.setPresence({
        activity : {
            name : " game with winky!!!",
            type : "PLAYING"
        },
        status : 'online'
    })
    client.user.setActivity(`with winky`, { type: "PLAYING" });
})

client.on("message", msg => {
    if (msg.content.substring(0, 1) === prefix){
    
        args = splitCMD(msg.content)
        cmd = getCMD(msg.content)
        //msg.channel.send(cmd)
        switch (cmd) {
            case "ping":
                msg.reply("Pong !! " + client.ws.ping + " ms")
                break;
            case "avatar":
                member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member
                console.log(member)
                URL = member.user.avatarURL({ format : 'jpg', dynamic : true, size : 1024})
                avatarEmbed = new MessageEmbed()
                    .setImage(URL)
                    .setURL(URL)
                    .setTitle('Download here')
                msg.reply(`Here is ${member} avatar`)
                msg.channel.send(avatarEmbed)
            default:
                break;
        }
    }
})

client.login(token)