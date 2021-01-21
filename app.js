require("dotenv").config();

const path = require("path");
const Discord = require("discord.js");
const discordTTS = require("discord-tts");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

var cancermode = false;

bot.login(TOKEN);

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (msg) => {
  if (msg.author.id === bot.user.id) return;
  if (msg.content === "test") {
    playSound(bot, msg);
  } else if (msg.content.includes("lait") || msg.content.includes("coco")) {
    playSound(
      bot,
      msg,
      "laitdecoco.mp3",
      "ça groove ici ... :coconut: :palm_tree: "
    );
  } else if (msg.content.startsWith("!kick")) {
    // if (msg.mentions.users.size) {
    //     const taggedUser = msg.mentions.users.first();
    //     msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    // } else {
    //     msg.reply('Please tag a valid user!');
    // }
  } else if (msg.content == "ping") {
    msg.channel.send("pinging...").then((sentMsg) => {
      sentMsg.edit(`\`${sentMsg.createdTimestamp - msg.createdTimestamp}ms\``);
    });
  } else if (msg.content.includes("chinois")) {
    playSound(
      bot,
      msg,
      "chinese.mp3",
      ":flag_cn: :flag_cn: :flag_cn: :flag_cn: 中国第一 :flag_cn: :flag_cn: :flag_cn: :flag_cn: "
    );
  } else if (
    msg.content.includes("deco") ||
    msg.content.includes("bouge") ||
    msg.content.includes("degage") ||
    msg.content.includes("dégage") ||
    (msg.content.includes("pars") && msg.content.includes("bot")) ||
    (msg.content.includes("stop") && msg.content.includes("linkenbot"))
  ) {
    msg.member.voice.channel.leave();
  } else if (
    msg.content.includes("viens") ||
    msg.content.includes("reviens") ||
    (msg.content.includes("bot") && msg.content.includes("venir"))
  ) {
    var channelId = msg.member.voice.channelID;
    var channel = bot.channels.cache.get(channelId);
    channel.join().then((connection) => { });
  } else if (msg.content.includes("hentai")) {
    text = `⠄⠄⠄⢰⣧⣼⣯⠄⣸⣠⣶⣶⣦⣾⠄⠄⠄⠄⡀⠄⢀⣿⣿⠄⠄⠄⢸⡇⠄⠄
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
    playSound(bot, msg, "hentai.m4a", text);
  } else if (msg.content.includes("bruh")) {
    var random = Math.floor(Math.random() * 10) + 1;
    var fileName, text;
    if (1 == random) {
      fileName = "bruhrare.mp3";
      text = ":warning: ALERTE CE BRUH MOMENT EST TRES RARE :warning:";
    } else {
      fileName = "bruh.mp3";
      text = "c'est bien un bruh moment certifié :white_check_mark:";
    }
    playSound(bot, msg, fileName, text);
  } else if (msg.content.startsWith("tts")) {
    var text = msg.content.split("tts ")[1];
    tts(bot, msg, text);
  } else if (msg.content.startsWith("cancermode")) {
    if (1 == msg.content.split(" ").length) cancermode = !cancermode;
    else if ("off" == msg.content.split(" ")[1]) cancermode = false;
    else if ("on" == msg.content.split(" ")[1]) cancermode = true;
    else return;
    if (true == cancermode) msg.channel.send('cancermode activé :white_check_mark:');
    else msg.channel.send('cancermode désactivé :negative_squared_cross_mark:');
  } else {
    if (cancermode) {
      var t = msg.member.user.tag.split("#")[0] + " a dit " + msg.content;
      playSound(bot, msg, "notif.mp3", "");
      msg.channel.send(t);
    }
  }
});

function playSound(bot, msg, fileName, message) {
  var channelId = msg.member.voice.channelID;
  var channel = bot.channels.cache.get(channelId);
  channel.join().then((connection) => {
    const dispatcher = connection.play(path.join("sounds", fileName));
    // dispatcher.on("finish", end => {
    //     channel.leave();
    //     // deleteFile(fileName);
    // });
  }).catch(console.error);
  if ("" !== message) msg.channel.send(message);
}

function tts(bot, msg, text) {
  const broadcast = bot.voice.createBroadcast();
  var channelId = msg.member.voice.channelID;

  var channel = bot.channels.cache.get(channelId);
  channel.join().then((connection) => {
    broadcast.play(discordTTS.getVoiceStream(text));
    const dispatcher = connection.play(broadcast);
  });
  // msg.channel.send(text);
}
