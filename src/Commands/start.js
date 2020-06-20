module.exports.hello = 'Hello World!';

module.exports.crateTeacherRole = (message) => {
  if (message.guild.roles.cache.some((role) => role.name === 'Teacher')) {
    message.reply('There´s already a role of teacher in your server');
    return;
  }

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
      )
      .then(() => createStudentRole(message));
  } catch (error) {
    console.log(error);
  }
};

const createStudentRole = function (message) {
  if (message.guild.roles.cache.some((role) => role.name === 'Student')) {
    message.reply('There´s already a role of student in your server');
    return;
  }

  try {
    message.guild.roles
      .create({
        data: {
          name: 'Student',
          color: 'BLUE',
          permissions: [
            'ADD_REACTIONS',
            'CREATE_INSTANT_INVITE',
            'STREAM',
            'VIEW_CHANNEL',
            'SEND_MESSAGES',
            'READ_MESSAGE_HISTORY',
            'MENTION_EVERYONE',
            'CONNECT',
            'SPEAK',
            'CHANGE_NICKNAME',
            'ATTACH_FILES',
          ],
        },
        reason: 'Test for roles',
      })
      .then(() => assignStudentRole(message));
  } catch (error) {
    console.log(error);
  }
};

const assignStudentRole = function (message) {
  const studentRole = message.guild.roles.cache.find(
    (role) => role.name === 'Student'
  );

  for (let user of message.guild.members.cache.values()) {
    if (!user.roles.cache.some((role) => role.name === 'Teacher')) {
      user.roles.add(studentRole);
    }
  }
};
