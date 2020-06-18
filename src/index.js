const { welcome, nickname } = require('./Commands/nickname');
const { hello } = require('./Commands/start');
const botcofig = require('../botconfig.json');
const Discord = require('discord.js');
const client = new Discord.Client();

//Bot connection
client.on('ready', () => {
  console.log(`Bot is ready as ${client.user.tag}!`);
});

//When a new user entry in the server
client.on('guildMemberAdd', (member) => {
  welcome(member);
});

//Commands listeners
//!starts
client.on('message', (message) => {
  if (message.content === '!start') {
    message.reply(hello);
  }
});

//!nickname
client.on('message', (message) => {
  if (message.content.startsWith('!nickname')) {
    nickname(message);
  }
});

client.login(botcofig.token);
