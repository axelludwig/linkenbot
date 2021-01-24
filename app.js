require("dotenv").config();

const express = require("express");
const Discord = require("discord.js");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const discordTTS = require("discord-tts");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 8000;

app.use(express.json());
// io.origins('*:*');

var textChannel;
var isListeningToTextChannel = [];

io.listen(port);
console.log('sockets listening on port ', port);

var cancermode = false;
bot.login(TOKEN);


io.on("connection", socket => {
  console.log("client connected")

  // socket.emit("my_message", 'test');
  socket.on('my response', (e) => {
    // console.log(e)
    // bruh(bot, null);
    // getTextChannels(bot);
    console.log('ok');
  })

  socket.on('command', (e) => {
    console.log('received code ' + e.code);
    if ('11' == e.code) {
      join(bot);
    }
    else if ('12' == e.code) {
      leave(bot)
    }
    else if ('13' == e.code) {
      writeInChat(bot, '!play disappointed')

      // bruh(bot, null)
    }
    else if ('40' == e.code) {
      // bruh(bot, null)

    }
    // console.log(e)
    // bruh(bot, null);
    // getTextChannels(bot);
  })




  socket.on('test', (e) => {
    console.log("sockets ok")
    socket.emit("test2", '');
  })
  socket.on("disconnect", () => console.log("disconnected"));
});



bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});


bot.on("message", (msg) => {
  if (msg.author.id === bot.user.id) return;

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
    } else {
      msg.channel.send('choississez le serveur en tapant un nombre');
    };

    console.log();
  } else {

    // test
    if (msg.content === "test") {
      writeInChat(bot, 'i robot')
    }

    // lait de coco
    else if (msg.content.includes("lait de coco") || msg.content.includes("coco")) {
      playSound(bot, msg, "laitdecoco.mp3", "ça groove ici ... :coconut: :palm_tree: "
      );
    }

    // tts
    else if (msg.content.startsWith("^^tts")) {
      var text = msg.content.split("tts ")[1];
      tts(bot, msg, text);
    }

    // ping
    else if (msg.content == "ping") {
      msg.channel.send("pinging...").then((sentMsg) => {
        sentMsg.edit(`\`${sentMsg.createdTimestamp - msg.createdTimestamp}ms\``);
      });
    }

    // channel
    else if (msg.content == ("^^channel")) {
      var list = [];
      servers = getTextChannels(bot);
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

    // chinois
    else if (msg.content.includes("chinois")) {
      playSound(bot, msg, "chinese.mp3", ":flag_cn: :flag_cn: :flag_cn: :flag_cn: 中国第一 :flag_cn: :flag_cn: :flag_cn: :flag_cn: "
      );
    }

    // leave
    else if (msg.content.includes("deco") || msg.content.includes("^^leave") || msg.content.includes("^^stop") || msg.content.includes("bouge") || msg.content.includes("degage") || msg.content.includes("dégage")
      || (msg.content.includes("pars") && msg.content.includes("bot")) || (msg.content.includes("stop") && msg.content.includes("linkenbot"))) {
      msg.member.voice.channel.leave();
    }

    // join
    else if (
      msg.content.includes("viens") || msg.content.includes("^^join") || msg.content.includes("reviens") ||
      (msg.content.includes("bot") && msg.content.includes("venir"))
    ) {
      var channelId = msg.member.voice.channelID;
      var channel = bot.channels.cache.get(channelId);
      channel.join();
    }

    // hentai
    else if (msg.content.includes("hentai")) {
      text = `⠄⠄⠄⢰⣧⣼⣯⠄⣸⣠⣶⣶⣦⣾⠄⠄⠄⠄⡀⠄⢀⣿⣿⠄⠄⠄⢸⡇⠄⠄
         ⠄⠄⠄⣾⣿⠿⠿⠶⠿⢿⣿⣿⣿⣿⣦⣤⣄⢀⡅⢠⣾⣛⡉⠄⠄⠄⠸⢀⣿⠄
         ⠄⠄⢀⡋⣡⣴⣶⣶⡀⠄⠄⠙⢿⣿⣿⣿⣿⣿⣴⣿⣿⣿⢃⣤⣄⣀⣥⣿⣿⠄
         ⠄⠄⢸⣇⠻⣿⣿⣿⣧⣀⢀⣠⡌⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⣿⣿⣿⠄
         ⠄⢀⢸⣿⣷⣤⣤⣤⣬⣙⣛⢿⣿⣿⣿⣿⣿⣿⡿⣿⣿⡍⠄⠄⢀⣤⣄⠉⠋⣰
         ⠄⣼⣖⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⢇⣿⣿⡷⠶⠶⢿⣿⣿⠇⢀⣤
         ⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣿⣿⡇⣿⣿⣿⣿⣿⣿⣷⣶⣥⣴⣿⡗♀♀♀
         ⢀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠄
         ⢸⣿⣦⣌⣛⣻⣿⣿⣧⠙⠛⠛⡭⠅⠒⠦⠭⣭⡻⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠄
         ⠘⣿⣿⣿⣿⣿⣿⣿⣿⡆⠄⠄⠄⠄⠄⠄⠄⠄⠹⠈⢋⣽⣿⣿⣿⣿⣵⣾⠃⠄
         ⠄⠘⣿⣿⣿⣿⣿⣿⣿⣿⠄⣴⣿⣶⣄⠄⣴⣶⠄⢀⣾⣿⣿⣿⣿⣿⣿⠃⠄⠄
         ⠄⠄⠈⠻⣿⣿⣿⣿⣿⣿⡄⢻⣿⣿⣿⠄⣿⣿⡀⣾⣿⣿⣿⣿⣛⠛⠁⠄⠄⠄
         ⠄⠄⠄⠄⠈⠛⢿⣿⣿⣿⠁⠞⢿⣿⣿⡄⢿⣿⡇⣸⣿⣿⠿⠛⠁⠄⠄⠄⠄⠄
         ⠄⠄⠄⠄⠄⠄⠄⠉⠻⣿⣿⣾⣦⡙⠻⣷⣾⣿⠃⠿⠋⠁⠄⠄⠄⠄⠄⢀⣠⣴
         ⣿⣿⣿⣶⣶⣮⣥⣒⠲⢮⣝⡿⣿⣿⡆⣿⡿⠃⠄⠄⠄⠄⠄⠄⠄⣠⣴⣿⣿⣿
                  https://youtu.be/mB9ycd7ojsA`;
      playSound(bot, msg, "hentai.m4a", text);
    } else if (msg.content.includes("bruh")) {
      bruh(bot, msg);
    }

    // fart
    else if (msg.content.includes("fart")) {
      playSound(bot, msg, "fart.mp3", "");
    }

    // cancermode
    else if (msg.content.startsWith("^^cancermode")) {
      cancermode = !cancermode;
      if (true == cancermode) msg.channel.send('cancermode activé :white_check_mark:');
      else msg.channel.send('cancermode désactivé :negative_squared_cross_mark:');
    }

    // help
    else if (msg.content.includes("^^commands") || (msg.content.startsWith("^^help"))) {
      var text = `
      liste des commandes : \n ^^help \n ^^commands \n  ^^join \n  ^^leave \n  ^^stop \n  ^^tts \n  hentai \n  bruh \n  chinois \n  lait de coco \n fart`
      msg.channel.send(text);
    }

    // else cancer mode
    else {
      if (cancermode) {
        var t = msg.member.user.tag.split("#")[0] + " a dit " + msg.content;
        playSound(bot, msg, "notif.mp3", "");
        msg.channel.send(t);
      }
    }
  }
});


// functions

function playSound(bot, msg, fileName, text) {
  var channelId = msg.member.voice.channelID;
  var channel = bot.channels.cache.get(channelId);
  channel.join().then((connection) => {
    const dispatcher = connection.play(path.join("sounds", fileName));
    // dispatcher.on("finish", end => {
    //     channel.leave();
    //     // deleteFile(fileName);
    // });
  }).catch(console.error);
  if ("" !== text) msg.channel.send(text);
}

function playSoundChannel(bot, fileName, text) {
  var user = getMyChannel(bot);
  try {
    var connection = user.voice.channel.join().then((c) => {
      c.play(path.join("sounds", fileName))
    })
  } catch (error) { console.log(error); }
  // const dispatcher = connection.play(path.join("sounds", fileName));
  // if (text) channel.channel.send(text);
}

function tts(bot, msg, text) {
  const broadcast = bot.voice.createBroadcast();
  var channelId = msg.member.voice.channelID;

  var channel = bot.channels.cache.get(channelId);
  channel.join().then((connection) => {
    broadcast.play(discordTTS.getVoiceStream(text));
    const dispatcher = connection.play(broadcast);
  });
}

function bruh(bot, msg) {
  var random = Math.floor(Math.random() * 10) + 1;
  var fileName, text;
  if (1 == random) {
    fileName = "bruhrare.mp3";
    text = ":warning: ALERTE CE BRUH MOMENT EST TRES RARE :warning:";
  } else {
    fileName = "bruh.mp3";
    text = "c'est bien un bruh moment certifié :white_check_mark:";
  }
  if (msg) playSound(bot, msg, fileName, text);
  else playSoundChannel(bot, fileName, text);
}

function getMyChannel(bot) {
  var user;

  bot.guilds.cache.forEach(g => {
    var member = g.members.cache.find(m => {
      return m.user.username === 'linkenparis'
    }); if (member) user = member;
  });
  return user;
}

function getTextChannels(bot) {
  var server;

  //get guilds i'm on
  var t = bot.guilds.cache.forEach(g => {
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

function getTextChannelFromName(textChannel) {
  var channel;
  channels = getTextChannels(bot);
  channels.forEach((c) => {
    if (textChannel == c.name) channel = c
  })
  return channel;
}

function join(bot) {
  var user = getMyChannel(bot);
  user.voice.channel.join()
}

function leave(bot) {
  var user = getMyChannel(bot);
  user.voice.channel.leave()
}

function writeInChat(bot, text) {
  var channel = getTextChannelFromName(textChannel)
  if (!textChannel){
    // channel.send(`choisis d'abord un channel avec la commande ^^channel`)
    bruh(bot, null)
  }
  else channel.send(text)
}
