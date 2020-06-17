const botcofig = require('../botconfig.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Bot is ready as ${client.user.tag}!`);
});

client.on('message', (message) => {
  console.log(message.content);
});

client.login(botcofig.token);
