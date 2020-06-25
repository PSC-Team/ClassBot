module.exports.createTeacherRole = (message) => {
  if (message.guild.roles.cache.some((role) => role.name === 'Teacher')) {
    message.reply('There´s already a role of teacher in your server');
    createStudentRole(message);
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

module.exports.createCategoryChannels = (message) => {
  if (
    !message.guild.channels.cache.some(
      (role) => role.name === 'Class Voice Channels'
    )
  ) {
    message.guild.channels
      .create('Class Voice Channels', { type: 'category' })
      .then(() => createVoiceChannels(message))
      .catch(console.log);
  }

  if (
    !message.guild.channels.cache.some(
      (role) => role.name === 'Class Text Channels'
    )
  ) {
    message.guild.channels
      .create('Class Text Channels', { type: 'category' })
      .then(() => createTextChannels(message))
      .catch(console.log);
  }

  if (
    !message.guild.channels.cache.some(
      (role) => role.name === 'Professor Text Channels'
    )
  ) {
    message.guild.channels
      .create('Professor Text Channels', { type: 'category' })
      .then(() => createTeacherChannels(message))
      .catch(console.log);
  }
};

const createTextChannels = (message) => {
  let category = message.guild.channels.cache.find(
    (c) => c.name == 'Class Text Channels' && c.type == 'category'
  );

  //Text channel Classroom
  message.guild.channels.create('Classroom', {
    type: 'text',
    reason: 'General text chat for all students',
    parent: category.id,
  });

  //Text channel Doubts
  message.guild.channels.create('Doubts', {
    type: 'text',
    reason: 'General text chat for students about course',
    parent: category.id,
  });
};

const createVoiceChannels = (message) => {
  let category = message.guild.channels.cache.find(
    (c) => c.name == 'Class Voice Channels' && c.type == 'category'
  );

  //Voice channel Classroom
  message.guild.channels.create('Classroom', {
    type: 'voice',
    reason: 'General text chat for all students',
    parent: category.id,
  });

  //Voice channel Classroom
  message.guild.channels.create('Consultancies', {
    type: 'voice',
    reason: 'General text chat for students about course',
    parent: category.id,
  });

  //Voice channel Team #1
  message.guild.channels.create('Team #1', {
    type: 'voice',
    reason: 'Voice Channel to team #1',
    parent: category.id,
  });

  //Voice channel Team #2
  message.guild.channels.create('Team #2', {
    type: 'voice',
    reason: 'Voice Channel to team #2',
    parent: category.id,
  });

  //Voice channel Team #3
  message.guild.channels.create('Team #3', {
    type: 'voice',
    reason: 'Voice Channel to team #3',
    parent: category.id,
  });

  //Voice channel Team #4
  message.guild.channels.create('Team #4', {
    type: 'voice',
    reason: 'Voice Channel to team #4',
    parent: category.id,
  });

  //Voice channel Team #5
  message.guild.channels.create('Team #5', {
    type: 'voice',
    reason: 'Voice Channel to team #5',
    parent: category.id,
  });
};

const createTeacherChannels = (message) => {
  let category = message.guild.channels.cache.find(
    (c) => c.name == 'Professor Text Channels' && c.type == 'category'
  );

  //Text channel Teacher Workstation
  message.guild.channels.create('Teacher Workstation', {
    type: 'text',
    reason: 'Workstation to manage teacher commands.',
    parent: category.id,
  });
};

module.exports.deleteRoles = async function (message) {
  for (let role of message.guild.roles.cache.values()) {
    try {
      await role.delete();
    } catch {}
  }

  module.exports.createTeacherRole(message);
};
