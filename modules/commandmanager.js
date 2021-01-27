(function () {
  const discord = require('./discord.js')
  const discordTTS = require("discord-tts");

  module.exports.manageChat = function (client, msg, arguments) {

    var listening = false; var list = [];
    isListeningToTextChannel.forEach((c) => {
      if (msg.guild.name == c.serverName) {
        listening = true;
        list = c.list;
        isListeningToTextChannel.splice(isListeningToTextChannel.indexOf(c), 1)
      }
    })
    if (listening) {
      if (!isNaN(msg.content)) {
        msg.channel.send(list[parseInt(msg.content)]);
        textChannel = list[parseInt(msg.content)];
      } else msg.channel.send('choississez le serveur en tapant un nombre');
    } else {
      command = arguments.split(' ')[0];
      argument = arguments.split(command)[1];

      if (commands.includes(command)) {
        switch (command) {
          case '^^join':
            discord.join(client);
            break;
          case '^^leave':
            discord.leave(client);
            break;
          case '^^stop':
            discord.stop();
            break;
          case '^^ping':
            this.ping(msg)
            break;
          case '^^tts':
            this.tts(client, msg, argument)
            break;
          case '^^channel':
            this.channel(client, msg)
            break;
          case '^^cancermode':
            this.cancermode(msg)
            break;
          case '^^help':
            this.help(msg)
            break;
          default:
            break;
        }

      }
      else if (msg.content.includes("deco") || msg.content.includes("^^leave") || msg.content.includes("bouge") || msg.content.includes("degage") || msg.content.includes("dégage")
        || (msg.content.includes("pars") && msg.content.includes("bot"))) {
        discord.leave(client);
      } else if (
        msg.content.includes("viens") || msg.content.includes("^^join") || msg.content.includes("reviens") ||
        (msg.content.includes("bot") && msg.content.includes("venir"))
      ) discord.join(client);
      else if (arguments.includes('bruh')) this.bruh(client, msg);
      else if (arguments.includes('chinois')) this.chinois(client, msg);
      else if (arguments.includes('hentai')) this.hentai(client, msg);
      else if (arguments.includes('toutou')) this.woof(client);
      else if (arguments.includes('coco') || arguments.includes('lait')) this.coco(client, msg);
      else if (arguments.includes('fart')) discord.playSoundWithText(client, msg, "fart.mp3", '');
      // }
      else {
        if (cancermode) {
          var t = msg.member.user.tag.split("#")[0] + " a dit " + msg.content;
          discord.playSoundWithText(client, msg, "notif.mp3", "");
          msg.channel.send(t);
        }
      }
    } 13
  }

  module.exports.manageSound = function (client, sound) {
    if (sounds.includes(sound)) {
      discord.playSoundChannel(client, sound + '.mp3')
      discord.setlastBotCommand('linken');
    } else if (writeSounds.includes(sound)) {
      discord.writeInChat(client, '!play ' + sound)
      discord.setlastBotCommand('guikss');
    }
  }

  module.exports.ping = function (msg) {
    msg.channel.send("pinging...").then((sentMsg) => {
      sentMsg.edit(`\`${sentMsg.createdTimestamp - msg.createdTimestamp}ms\``);
    });
  }

  module.exports.tts = function (client, msg, text) {
    const broadcast = client.voice.createBroadcast();
    var channelId = msg.member.voice.channelID;

    var channel = client.channels.cache.get(channelId);
    channel.join().then((connection) => {
      broadcast.play(discordTTS.getVoiceStream(text));
      const dispatcher = connection.play(broadcast);
    });
  }

  module.exports.channel = function (client, msg) {
    var list = [];
    var servers = discord.getTextChannels(client);
    var text = ''; var index = 1;
    servers.forEach((s) => {
      text += `${index} - ${s.name}\n`;
      list[index] = s.name;
      index++;
    }); msg.channel.send(`${text}`);
    isListeningToTextChannel.push({
      serverName: msg.guild.name,
      list: list
    });
  }

  module.exports.cancermode = function (msg) {
    cancermode = !cancermode;
    if (true == cancermode) msg.channel.send('cancermode activé :white_check_mark:');
    else msg.channel.send('cancermode désactivé :negative_squared_cross_mark:');
  }

  module.exports.help = function (msg) {
    var text = `
    liste des commandes : \n ^^help \n ^^commands \n  ^^join \n  ^^leave \n  ^^stop \n  ^^tts \n  hentai \n  bruh \n  chinois \n  lait de coco \n fart`
    msg.channel.send(text);
  }

  module.exports.bruh = function (client, msg) {
    var random = Math.floor(Math.random() * 10) + 1;
    var fileName, text;
    if (1 == random) {
      fileName = "bruhrare.mp3";
      text = ":warning: ALERTE CE BRUH MOMENT EST TRES RARE :warning:";
    } else {
      fileName = "bruh.mp3";
      text = "c'est bien un bruh moment certifié :white_check_mark:";
    } discord.playSoundWithText(client, msg, fileName, text);
  }

  module.exports.chinois = function (client, msg) {
    discord.playSoundWithText(client, msg, 'chinois.mp3', chinoisText);
  }

  module.exports.hentai = function (client, msg) {
    discord.playSoundWithText(client, msg, 'hentai.m4a', hentaiText);
  }

  module.exports.coco = function (client, msg) {
    discord.playSoundWithText(client, msg, 'laitdecoco.mp3', coco);
  }

  module.exports.woof = function (client) {
    discord.writeInChat(client, woof);
  }

}());

var isListeningToTextChannel = [];
var cancermode = false;

commands = ['^^join', '^^leave', '^^stop', '^^ping', '^^tts', '^^channel', '^^cancermode', '^^help']
sounds = ['bruh', 'fart', 'laitdecoco', 'notif', 'sslol', 'sslolsoft']
writeSounds = ['adult', 'applause', 'bakugo', 'beat', 'bell', 'botdiff', 'cellela', 'circus', 'criquet', 'cute', 'death', 'disappointed', 'disque', 'ghost', 'ghost2', 'hacked', 'heartbeat', 'junglediff', 'lavie', 'lesale', 'mum', 'nojunglediff', 'pasa', 'quoi', 'rire', 'roaming', 'rototo', 'sad', 'saiyan', 'sample', 'tagueule', 'yoking']

hentaiText =
  `⠄⠄⠄⢰⣧⣼⣯⠄⣸⣠⣶⣶⣦⣾⠄⠄⠄⠄⡀⠄⢀⣿⣿⠄⠄⠄⢸⡇⠄⠄
⠄⠄⠄⣾⣿⠿⠿⠶⠿⢿⣿⣿⣿⣿⣦⣤⣄⢀⡅⢠⣾⣛⡉⠄⠄⠄⠸⢀⣿⠄
⠄⠄⢀⡋⣡⣴⣶⣶⡀⠄⠄⠙⢿⣿⣿⣿⣿⣿⣴⣿⣿⣿⢃⣤⣄⣀⣥⣿⣿⠄
⠄⠄⢸⣇⠻⣿⣿⣿⣧⣀⢀⣠⡌⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⣿⣿⣿⠄
⠄⢀⢸⣿⣷⣤⣤⣤⣬⣙⣛⢿⣿⣿⣿⣿⣿⣿⡿⣿⣿⡍⠄⠄⢀⣤⣄⠉⠋⣰
⠄⣼⣖⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⢇⣿⣿⡷⠶⠶⢿⣿⣿⠇⢀⣤
⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣿⣿⡇⣿⣿⣿⣿⣿⣿⣷⣶⣥⣴⣿⡗
⢀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠄
⢸⣿⣦⣌⣛⣻⣿⣿⣧⠙⠛⠛⡭⠅⠒⠦⠭⣭⡻⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠄
⠘⣿⣿⣿⣿⣿⣿⣿⣿⡆⠄⠄⠄⠄⠄⠄⠄⠄⠹⠈⢋⣽⣿⣿⣿⣿⣵⣾⠃⠄
⠄⠘⣿⣿⣿⣿⣿⣿⣿⣿⠄⣴⣿⣶⣄⠄⣴⣶⠄⢀⣾⣿⣿⣿⣿⣿⣿⠃⠄⠄
⠄⠄⠈⠻⣿⣿⣿⣿⣿⣿⡄⢻⣿⣿⣿⠄⣿⣿⡀⣾⣿⣿⣿⣿⣛⠛⠁⠄⠄⠄
⠄⠄⠄⠄⠈⠛⢿⣿⣿⣿⠁⠞⢿⣿⣿⡄⢿⣿⡇⣸⣿⣿⠿⠛⠁⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠉⠻⣿⣿⣾⣦⡙⠻⣷⣾⣿⠃⠿⠋⠁⠄⠄⠄⠄⠄⢀⣠⣴
⣿⣿⣿⣶⣶⣮⣥⣒⠲⢮⣝⡿⣿⣿⡆⣿⡿⠃⠄⠄⠄⠄⠄⠄⠄⣠⣴⣿⣿⣿
https://youtu.be/mB9ycd7ojsA`;
chinoisText = ':flag_cn: :flag_cn: :flag_cn: :flag_cn: 中国第一 :flag_cn: :flag_cn: :flag_cn: :flag_cn:'
coco = 'ça groove ici ... :coconut: :palm_tree:'
woof = ':bone: woof woof :dog:'