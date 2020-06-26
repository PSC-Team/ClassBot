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
  } else {
    createVoiceChannels(message);
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
  } else {
    createTextChannels(message);
  }

  if (
    !message.guild.channels.cache.some(
      (role) => role.name === 'Professor Private Channels'
    )
  ) {
    message.guild.channels
      .create('Professor Private Channels', { type: 'category' })
      .then(() => createTeacherChannels(message))
      .catch(console.log);
  } else {
    createTeacherChannels(message);
  }
};

const createTextChannels = (message) => {
  let category = message.guild.channels.cache.find(
    (c) => c.name == 'Class Text Channels' && c.type == 'category'
  );

  //Text channel Classroom
  if (
    !message.guild.channels.cache.some(
      (channel) => channel.name == '🚀-classroom' && channel.type == 'text'
    )
  ) {
    message.guild.channels.create('🚀-classroom', {
      type: 'text',
      reason: 'General text chat for all students',
      parent: category.id,
      position: 1,
    });
  }

  //Text channel Doubts
  if (
    !message.guild.channels.cache.some(
      (channel) => channel.name == '🔎-doubts' && channel.type == 'text'
    )
  ) {
    message.guild.channels.create('🔎-doubts', {
      type: 'text',
      reason: 'General text chat for students about course',
      parent: category.id,
      position: 2,
    });
  }

  if (
    !message.guild.channels.cache.some(
      (channel) => channel.name == '🔔-notices' && channel.type == 'text'
    )
  ) {
    message.guild.channels.create('🔔-notices', {
      type: 'text',
      reason: 'General text chat for class notices',
      parent: category.id,
      position: 3,
    });
  }
};

const createVoiceChannels = (message) => {
  let category = message.guild.channels.cache.find(
    (c) => c.name == 'Class Voice Channels' && c.type == 'category'
  );

  //Voice channel Classroom
  if (
    !message.guild.channels.cache.some(
      (channel) => channel.name == '[🔊] Classroom' && channel.type == 'voice'
    )
  ) {
    message.guild.channels.create('[🔊] Classroom', {
      type: 'voice',
      reason: 'General text chat for all students',
      parent: category.id,
      position: 1,
    });
  }

  //Voice channel Classroom
  if (
    !message.guild.channels.cache.some(
      (channel) =>
        channel.name == '[👥] Consultancies' && channel.type == 'voice'
    )
  ) {
    message.guild.channels.create('[👥] Consultancies', {
      type: 'voice',
      reason: 'General text chat for students about course',
      parent: category.id,
      position: 2,
    });
  }

  //Voice channel Team #1
  if (
    !message.guild.channels.cache.some(
      (channel) => channel.name == '[📕] Team #1' && channel.type == 'voice'
    )
  ) {
    message.guild.channels.create('[📕] Team #1', {
      type: 'voice',
      reason: 'Voice Channel to team #1',
      parent: category.id,
      position: 3,
    });
  }

  //Voice channel Team #2
  if (
    !message.guild.channels.cache.some(
      (channel) => channel.name == '[📘] Team #2' && channel.type == 'voice'
    )
  ) {
    message.guild.channels.create('[📘] Team #2', {
      type: 'voice',
      reason: 'Voice Channel to team #2',
      parent: category.id,
      position: 4,
    });
  }

  //Voice channel Team #3
  if (
    !message.guild.channels.cache.some(
      (channel) => channel.name == '[📗] Team #3' && channel.type == 'voice'
    )
  ) {
    message.guild.channels.create('[📗] Team #3', {
      type: 'voice',
      reason: 'Voice Channel to team #3',
      parent: category.id,
      position: 5,
    });
  }

  //Voice channel Team #4
  if (
    !message.guild.channels.cache.some(
      (channel) => channel.name == '[📔] Team #4' && channel.type == 'voice'
    )
  ) {
    message.guild.channels.create('[📔] Team #4', {
      type: 'voice',
      reason: 'Voice Channel to team #4',
      parent: category.id,
      position: 6,
    });
  }

  //Voice channel Team #5
  if (
    !message.guild.channels.cache.some(
      (channel) => channel.name == '[📓] Team #5' && channel.type == 'voice'
    )
  ) {
    message.guild.channels.create('[📓] Team #5', {
      type: 'voice',
      reason: 'Voice Channel to team #5',
      parent: category.id,
      position: 7,
    });
  }
};

const createTeacherChannels = (message) => {
  let category = message.guild.channels.cache.find(
    (c) => c.name == 'Professor Private Channels' && c.type == 'category'
  );

  let role = message.guild.roles.cache.find((role) => role.name === 'Student');
  console.log(role.id);

  //Text channel Teacher Workstation
  if (
    !message.guild.channels.cache.some(
      (channel) =>
        channel.name == '🔒-teacher-workstation' && channel.type == 'text'
    )
  ) {
    message.guild.channels.create('🔒-teacher-workstation', {
      type: 'text',
      reason: 'Workstation to manage teacher commands.',
      parent: category.id,
      position: 1,
      permissionOverwrites: [
        {
          id: role.id,
          deny: ['CREATE_INSTANT_INVITE', 'VIEW_CHANNEL', 'CONNECT', 'SPEAK'],
        },
      ],
    });
  }

  if (
    !message.guild.channels.cache.some(
      (channel) =>
        channel.name == '[🚧] Teachers Voice Channel' && channel.type == 'voice'
    )
  ) {
    message.guild.channels.create('[🚧] Teachers Voice Channel', {
      type: 'voice',
      reason: 'Voice Channel to team #5',
      parent: category.id,
      position: 2,
      permissionOverwrites: [
        {
          id: role.id,
          deny: ['CREATE_INSTANT_INVITE', 'VIEW_CHANNEL', 'CONNECT', 'SPEAK'],
        },
      ],
    });
  }
};

module.exports.deleteRoles = async function (message) {
  for (let role of message.guild.roles.cache.values()) {
    try {
      await role.delete();
    } catch {}
  }

  module.exports.createTeacherRole(message);
};
