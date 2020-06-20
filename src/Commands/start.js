module.exports.start = (message) => {
  try {
    message.guild.roles
      .create({
        data: {
          name: 'Teacher',
          color: 'RED',
          permissions: 'ADMINISTRATOR',
        },
        reason: 'This is the course teacher',
      })
      .then((role) => message.member.roles.add(role))
      .then(
        message.reply('Congratulations! You are the teacher of this course')
      );
  } catch (error) {
    console.log(error);
  }
};
