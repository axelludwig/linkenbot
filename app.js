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
    if ('join' == e.code) discord.join(client);
    else if ('leave' == e.code) discord.leave(client);
    else if ('stop' == e.code) discord.stop(client);
    else commandmanager.manageSound(client, e.code)
    console.log('received code ' + e.code);
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