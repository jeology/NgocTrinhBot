const Discord = require('discord.js');
const auth = require('./auth.json');
const prefix = auth.prefix;
// Initialize Discord Bot
var bot = new Discord.Client();
const ownerID = 695004578940321874;
const active = new Map();

bot.login(auth.token);

bot.on('ready', () => {
    console.log('Connected');
    console.log('Logged in as: ');
    console.log(bot.user.username + ' - (' + bot.user.id + ')');
});

bot.on('message', async message => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if(!message.content.startsWith(prefix)) return;

    var args = message.content.slice(prefix.length).trim().split(" ");
    var command = args.shift().toLowerCase();


    //Command handler
    try {
            delete require.cache[require.resolve(`./commands/${command}.js`)]


            let ops = {
                    ownerID: ownerID,
                    active: active
            }; // ops will always have active as Map

            let commandFile = require(`./commands/${command}.js`);
            commandFile.run(bot, message, args, ops);
    }
    catch(e) {
            console.log(e.stack);
    }
});
