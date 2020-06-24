module.exports.sendGrade = function (message) {
  var input = message.content.replace('!send-grade', '').split(' ');
  var mentions = message.mentions.users.array();
  var inputMessage = '';

  //Checks if there is no a mention
  if (mentions == 0) {
    message.reply('Please mention someone, to send him his grade.');
    return;
  }

  //Checks if there is a bot between the mentions
  for (let l = 0; l < mentions.length; l++) {
    if (mentions[l].bot == true) {
      message.reply('Please dont mention bots, skip it and try again.');
      return;
    }
  }

  //Clears the input removing the mentions to get the message
  for (let i = 0; i < input.length; i++) {
    if (input[i].includes('<@')) {
      input[i] = input[i].replace(input[i], '').trim();
    }
  }

  for (let j = 0; j < input.length; j++) {
    inputMessage = inputMessage + input[j] + ' ';
  }

  for (let k = 0; k < mentions.length; k++) {
    mentions[k].send(inputMessage);
  }

  message.reply('Grade sended.');
};
