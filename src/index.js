const { notice } = require('./Commands/notice');
const { welcome, nickname } = require('./Commands/nickname');
const { hello } = require('./Commands/start');
const { token, prefix } = require('../botconfig.json');
const Discord = require('discord.js');
const client = new Discord.Client();

//Bot connection
client.on('ready', () => {
  console.log(`Bot is ready as ${client.user.tag}!`);
});

//When a new user entry in the server
client.on('guildMemberAdd', (member) => {
  welcome(member, Discord);
});

//Commands listeners
client.on('message', (message) => {
  //!starts
  if (message.content === prefix + 'start') {
    message.reply(hello);
  }
  //!nickname
  if (message.content.startsWith(prefix + 'nickname')) {
    nickname(message);
  }

  if (message.content.startsWith(prefix + 'notice')) {
    notice(message, Discord);
  }

  //!notice
});

client.login(token);
