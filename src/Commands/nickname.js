module.exports.welcome = function (member, Discord) {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === 'general'
  );

  let serverName = member.guild.name;

  if (!channel) return;

  const messageEmbed = new Discord.MessageEmbed()
    .setColor('#41e6a4')
    .setTitle(
      `Welcome ${member.displayName} to the Course ${serverName} server.`
    )
    .setDescription(
      'Please type the command "!nickname" and forward your full name, so that your teacher can recognize you within this server.'
    )
    .setThumbnail(
      'https://i.pinimg.com/originals/98/d3/a2/98d3a283f98cded8e639957e935bd373.png'
    );

  channel.send(member.toString());
  channel.send(messageEmbed);
};

module.exports.nickname = function (message) {
  let input = message.content;
  let inputSplitted = input.split(' ');

  if (inputSplitted.length === 1) {
    message.reply('Please write your full name after the command.');
    return;
  }

<<<<<<< HEAD
  for (let i = 1; i < inputSplitted.length; i++) {
    nickName = nickName + inputSplitted[i] + ' ';
  }
  nickName.trim();
=======
  let nickName = input.replace('!nickname', '').trim();

>>>>>>> 82b8cb8bd4d89e708d864ee8cf0246f31989a308
  if (nickName.length <= 12) {
    message.reply('Please write your full name');
    return;
  }

  message.member
    .setNickname(nickName)
    .then(() => {
      message.reply('Your nickname has changed.');
    })
    .catch((Error) => {
      message.reply('Sorry, I dont have permission to change your nickname');
    });
};
