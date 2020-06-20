const { welcome, addNewStudentRole } = require('./Commands/welcome');
const { notice } = require('./Commands/notice');
const { nickname } = require('./Commands/nickname');
const { start } = require('./Commands/start');
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
  addNewStudentRole(member);
});

//Commands listeners
client.on('message', (message) => {
  //!starts
  if (message.content === prefix + 'start') {
    start(message);
  }
  //!nickname
  if (message.content.startsWith(prefix + 'nickname')) {
    nickname(message);
  }

  //!notice
  if (message.content.startsWith(prefix + 'notice')) {
    notice(message, Discord);
  }
});

client.login(token);
