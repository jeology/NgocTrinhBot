const ytdl = require("ytdl-core");
const yts = require('yt-search');

exports.run = async(bot, message, args, ops) => {
        //Check if the author is connected?
        if(!message.member.voice.channel)
                return message.channel.send("Anh vô phòng trước đi rồi em vô sau nè <3");
        //Checkif ngoctrinh is connected
        //if(message.guild.voiceChannel)
        //        return message.channel.send("Em vô phòng rồi nè. Em hông có mặc gì đâu");
        //Check if user input a url
        //if(!args[0])
        //        return message.channel.send("Anh ơi, đút em cái url với");
        // Validdate url
        let validate = await ytdl.validateURL(args[0]);
        //Check validation
        if(!validate) {
                let commandFile = require(`./tim.js`);
                return commandFile.run(bot, message, args, ops);
        }


        // Define the info
        let info = await ytdl.getInfo(args[0]);

        // Fetch the active
        let data = ops.active.get(message.guild.id) || {};

        // Update the data
        if(!data.connection)
                data.connection = await message.member.voice.channel.join();
        // Create the queue if there isn't a queue
        if(!data.queue)
                data.queue = [];
        data.guildID = message.guild.id;

        // Add the song to the queue
        data.queue.push({
                songTitle: info.title,
                request: message.author,
                url: args[0],
                announceChannel: message.channel.id
        })

        //If there isn't a dispatcher created, run the play function
        if(!data.dispatcher)
                play(bot, ops, data);
        else {
                message.channel.send(`Đã thêm vào danh sách: ${info.title} | được yêu cầu bởi baby: ${message.author}`);
        }

        //Update the map
        ops.active.set(message.guild.id, data);

        //Get yt video info
        //let info = await ytdl.getInfo(args[0]);

        //Store author server channel
        //let conneciton = await message.member.voiceChannel.join();

        //PLay song
        //let dispatcher = await connection.play(ytdl(args[0], {filter: 'audioonly'}));

        //Output now playing
        //message.channel.send(`Bài đang chơi nè mấy anh: ${info.title}`);
}

async function play(bot, ops, data) {
        // Send the now playing message
        bot.channels.cache.get(data.queue[0].announceChannel).send(`Đang phát: ${data.queue[0].songTitle} | được yêu cầu bởi baby: ${data.queue[0].request}`);

        // Next, update the dispatcher data
        data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {filter: 'audioonly'}));
        data.dispatcher.guildID = data.guildID;

        //Create a lisetner even that will run when the song ends
        data.dispatcher.once('finish', function() {
                // WHen this happen, we want to run a finish function
                finish(bot, ops, this); // pass 3 paraemter
        });
}

function finish(bot, ops, dispatcher) {

        // First, fetch the guild object from the Map
        let fetched = ops.active.get(dispatcher.guildID);

        //Remove first item in the queue
        fetched.queue.shift();

        // Then, checked if the queue is empty
        if(fetched.queue.length > 0) {
                // Update the map with new queue
                ops.active.set(dispatcher.guildID, fetched);

                //Finally, run the play function starting the next song
                play(bot, ops, fetched);
        } else { // This will run when the queue is empty
                // Delete the guildID object from the Map
                ops.active.delete(dispatcher.guildID);

                //Leavae the voice channel
                let vc = bot.guilds.get(dispatcher.guildID).me.voiceChannel; // This get the voiceChannel of the boi is in the guild
                if(vc)
                        vc.leave();
        }
}
