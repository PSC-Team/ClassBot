const {
  memberAdded,
  start,
  changeNickname,
  serverNotice,
  teacherSendGrade,
  teacherAddAssistant,
  teacherChangeTeacher,
  studentDoubtNotification,
  removeMember,
} = require('./commands-controller');

const { token, prefix } = require('../botconfig.json');

const Discord = require('discord.js');
const client = new Discord.Client();

require('./database/database');
require('./classroom-api');

//Bot connection
client.on('ready', () => {
  console.log(`Bot is ready as ${client.user.tag}!`);
});

//When a new user enters the server
client.on('guildMemberAdd', async (member) => {
  await memberAdded(member, Discord);
});

//When a user has been removed from the server
client.on('guildMemberRemove', async (member) => {
  await removeMember(member);
});

client.on('guildDelete', (member) => {
  console.log('Deleted');
});

//When a message was typed
client.on('message', async (message) => {
  if (message.channel.type === 'text') {
    if (message.content.startsWith(prefix + 'start')) {
      //!starts
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
  }

  if (message.channel.type === 'dm') {
    console.log(message.content);
  }
});

client.login(token);
