const {
  memberAdded,
  start,
  changeNickname,
  serverNotice,
  teacherSendGrade,
  teacherAddAssistant,
  teacherChangeTeacher,
  studentDoubtNotification,
} = require('./commands-controller');

const { token, prefix } = require('../botconfig.json');

const Discord = require('discord.js');
const client = new Discord.Client();

require('./database');

//Bot connection
client.on('ready', () => {
  console.log(`Bot is ready as ${client.user.tag}!`);
});

//When a new user enters the server
client.on('guildMemberAdd', (member) => {
  memberAdded(member, Discord);
});

//When a message was typed
client.on('message', async (message) => {
  //!starts
  if (message.content.startsWith(prefix + 'start')) {
    await start(message);
  }

  //!nickname
  if (message.content.startsWith(prefix + 'nickname')) {
    changeNickname(message);
  }

  //!notice
  if (message.content.startsWith(prefix + 'notice')) {
    serverNotice(message, Discord);
  }

  //!send-grade
  if (message.content.startsWith(prefix + 'send-grade')) {
    teacherSendGrade(message);
  }

  //!add-assistant
  if (message.content.startsWith(prefix + 'add-assistant')) {
    teacherAddAssistant(message);
  }

  //!change-teacher
  if (message.content.startsWith(prefix + 'change-teacher')) {
    teacherChangeTeacher(message);
  }

  //doubt notification
  studentDoubtNotification(message);
});

client.login(token);
