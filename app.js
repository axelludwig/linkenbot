require("dotenv").config();

const utils = require('./modules/utils.js')
const discord = require('./modules/discord.js')
const commandmanager = require('./modules/commandmanager.js')

const express = require("express");
const Discord = require("discord.js");
const http = require("http");
const path = require("path");
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 8000;
app.use(express.json());
// io.origins('*:*');

discord.setTextChannel(utils.getTextChannel())

io.listen(port);
console.log('sockets listening on port ', port);

client.login(TOKEN);

io.on("connection", socket => {
  console.log("client connected")

  socket.on('command', (e) => {
    console.log('received code ' + e.code);
    var code = Number(e.code);

    switch (code) {
      case 77:
        discord.join(client);
        break;
      case 88:
        discord.leave(client);
        break;
      case 99:
        discord.stop()
        break;
      case 11:
        // commandmanager.bruh(client, null)
        commandmanager.manageSound(client, 'bruh')
        break;
      case 12:
        commandmanager.manageSound(client, 'fart')
        break;
      case 13:
        commandmanager.manageSound(client, 'tagueule')
        break;
      case 14:
        sslolsoft();
        break;
      case 15:
        sslol();
        break;
      case 16:
        discord.writeInChat('!play yoking')
        break;
      case 17:
        discord.writeInChat('!play botdiff')
        break;
      case 16:
        discord.writeInChat('!play yoking')
        break;
      default:
        break;
    }
    socket.on("disconnect", () => console.log("disconnected"));
  });
})

client.on("ready", () => {
  console.info(`logged in as ${client.user.tag}`);
});


client.on("message", (msg) => {
  if (msg.author.id === client.user.id) return;
  commandmanager.manageChat(client, msg, msg.content);
});