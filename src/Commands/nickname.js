module.exports.welcome = function (member) {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === 'general'
  );

  const serverName = member.guild.name;

  if (!channel) return;
  channel.send(`Welcome ${member} to the Course ${serverName} server.`);
  channel.send(
    'Please type the command "!nickname" and forward your full name, so that your teacher can recognize you within this server.'
  );
};

module.exports.nickname = function (message) {
  var nickName = '';
  var input = message.content;
  var inputSplitted = input.split(' ');

  if (inputSplitted.length === 1) {
    message.reply('Please write your full name after the command.');
    return;
  }

  for (let i = 1; i < inputSplitted.length; i++) {
    nickName = nickName + inputSplitted[i] + ' ';
  }

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
