module.exports.nickname = function (message) {
  let input = message.content;
  let inputSplitted = input.split(' ');

  if (inputSplitted.length === 1) {
    message.reply('Please write your full name after the command.');
    return;
  }

  let nickName = input.replace('!nickname', '').trim();

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
