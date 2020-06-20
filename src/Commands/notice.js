// crear modulo,
module.exports.notice = function (message, Discord) {
  let messageSplitted = message.content.split(' ');

  if (messageSplitted.length === 1) {
    message.reply('Add a comment after the command');
    return;
  }

  let noticeMessage = message.content
    .replace('!notice', '')
    .trim()
    .toLowerCase();

  message.channel.send('@everyone');
  const embed = new Discord.MessageEmbed()
    .setColor('#ffff00')
    .setTitle('Notice')
    .setDescription(noticeMessage)
    .setThumbnail(
      'https://as2.ftcdn.net/jpg/03/28/49/57/500_F_328495731_wlzrJ94W3BAERUYZy7tr4VZZ8KmssLee.jpg'
    );
  message.channel.send(embed);
};
