exports.run = (bot, message, args, ops) => {
        if (message.author.id != ops.ownerID)
                return message.channel.send("Only the owner could use this command");

        try {
                delete require.cache[require.resolve(`.command/${args[0]}.js`)];
        } catch (e) {
                return message.channel.send(`Unable to reload command: !${args[0]}.js`);
        }

        return message.channel.send("Reload successfully");
}
