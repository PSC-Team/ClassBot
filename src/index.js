const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Bot is ready as ${client.user.tag}!`);
});

client.on('message', (message) => {
  console.log(message.content);
});

client.login('NzIyNTk2NzQ0MDk3MTY5NDI4.XulYug.hjJ5DWT_sP8zDRohKIYdpjtrMug');
