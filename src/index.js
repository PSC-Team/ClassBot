const { welcome, addNewStudentRole } = require('./Commands/welcome');
const { nickname } = require('./Commands/nickname');
const { notice } = require('./Commands/notice');
const { sendGrade } = require('./Commands/send-grade');
const { token, prefix } = require('../botconfig.json');
const { deleteRoles, deleteChannels } = require('./Commands/start');
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

client.on('message', async (message) => {
  //!starts
  if (message.content.startsWith(prefix + 'start')) {
    let flag = message.content.includes('-d');

    if (flag == true) {
      await deleteRoles(message);
      await deleteChannels(message);
    }
  }
  //!nickname
  if (message.content.startsWith(prefix + 'nickname')) {
    nickname(message);
  }

  //!notice
  if (message.content.startsWith(prefix + 'notice')) {
    notice(message, Discord);
  }

  //!send-grade
  if (message.content.startsWith(prefix + 'send-grade')) {
    sendGrade(message);
  }
});

client.login(token);
