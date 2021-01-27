const { lastIndexOf } = require("ffmpeg-static");

(function () {
    const path = require("path");
    const utils = require('./utils.js')

    module.exports.join = function (client) {
        var user = this.getMyChannel(client);
        user.voice.channel.join()
    }

    module.exports.leave = function (client) {
        var user = this.getMyChannel(client);
        user.voice.channel.leave()
    }

    module.exports.stop = function (client) {
        if ('linken' == lastBotCommand) dispatcher.destroy();
        else if ('guikss' == lastBotCommand) this.stopguikss(client)
    }

    module.exports.writeInChat = function (client, text) {
        var channel = this.getTextChannelFromName(client)
        if (!textChannel) console.log('pas de channel choisi');    // channel.send(`choisis d'abord un channel avec la commande ^^channel`)
        else channel.send(text)
    }

    module.exports.getTextChannelFromName = function (client) {
        var channel;
        channels = this.getTextChannels(client);
        channels.forEach((c) => {
            if (textChannel == utils.formatText(c.name)) channel = c
        })
        return channel;
    }

    module.exports.getTextChannels = function (client) {
        var server;

        //get guilds i'm on
        var t = client.guilds.cache.forEach(g => {
            var member = g.members.cache.find(m => {
                return m.user.username === 'linkenparis'
            }); if (member) server = g;
        });

        //get text chats
        var list = []
        server.channels.cache.forEach(s => {
            if ('text' == s.type) list.push(s)
        })
        return list;
    }

    module.exports.getMyChannel = function (client) {
        var user;

        client.guilds.cache.forEach(g => {
            var member = g.members.cache.find(m => {
                return m.user.username === 'linkenparis'
            }); if (member) user = member;
        });
        return user;
    }

    module.exports.stopguikss = function (client) {
        var channel = this.getTextChannelFromName(client)
        if (!textChannel) console.log('pas de channel choisi');    // channel.send(`choisis d'abord un channel avec la commande ^^channel`)
        else channel.send('!stop')
    }

    module.exports.playSoundWithText = function (client, msg, filename, text) {
        this.setlastBotCommand('linken');
        var channelId = msg.member.voice.channelID;
        var channel = client.channels.cache.get(channelId);
        try {
            channel.join().then((connection) => {
                dispatcher = connection.play(path.join("sounds", filename));
                // dispatcher.on("finish", end => {});
            }).catch(console.error);
            if ("" !== text) msg.channel.send(text);

        } catch (error) {
            msg.channel.send('il faut être en vocal pour mettre un son bg');
        }
    }

    module.exports.playSoundChannel = function (client, filename) {
        var user = this.getMyChannel(client);
        try {
            var connection = user.voice.channel.join().then((c) => {
                dispatcher = c.play(path.join("sounds", filename))
            })
        } catch (error) { console.log(error); }
    }

    module.exports.setTextChannel = function (t) {
        setTextChannel(t)
    }

    module.exports.setlastBotCommand = function (arg) {
        lastBotCommand = arg;
    }

}());

var textChannel;
function setTextChannel(t) {
    textChannel = t;
}

var lastBotCommand;
var dispatcher;