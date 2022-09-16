require('dotenv').config()

const token = process.env.token //get Token from environment
const {wbot} = require('./src/client.js') // create new client
const {prefix} = require('./config.json') // get prefix
const { getURLVideoID } = require('ytdl-core')
getCMD = (n) => n.slice(1).toLowerCase()
splitCMD = (n) => n.split(' ')
getURL = (a, b) => "https://cdn.discordapp.com/avatars/"+ a +"/"+ b +".jpeg"
wbot.on('ready', () => {
    console.log(`${wbot.user.username} đang hoạt động`)
    wbot.user.setPresence({ 
        activities: [{
            name : " game with winky!!!"
        }]
    });
    wbot.user.setStatus('online')
})

wbot.on('messageCreate', msg => {
    if (msg.content.substring(0, 1) === prefix){
        args = splitCMD(msg.content)
        cmd = getCMD(msg.content)
        //msg.channel.send(cmd)
        //console.log(msg.member)
        msg.react('✨')
        switch (cmd) {
            case "ping":
                msg.reply("Pong !! " + wbot.ws.ping + " ms")
                break;
            case "avatar":
                
                msg.reply('Your avatar here, onii - chan')
                msg.channel.send()


                break
            default :
                break
        }
    }
})

wbot.login(token) // Log in to Discord with bot token