const yts = require("yt-search");

exports.run = (bot, message, args, ops) => {
        yts(args.join(" "), function(err, r) {
                if (err)
                        return message.channel.send("Bé không tìm được mấy anh ơi >.<");
                const videos = r.videos;

                let commandFile = require(`./choi.js`);
                commandFile.run(bot, message, [videos[0].url], ops);
        });
}
