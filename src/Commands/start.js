const Guild = require('../models/guild');
const { addNewMember, findMember } = require('../database/functions');

module.exports.addMembersToDB = async (message) => {
  message.guild.members.cache.forEach(async (member) => {
    let user = await findMember(member.user.id);
    console.log(user);
    if (member.user.bot == false && !user) {
      discord_id = member.user.id;
      guild_id = member.guild.id;
      await addNewMember(discord_id, guild_id);
    }
  });
};

module.exports.addGuildToDB = async (message) => {
  let teacherRole = message.guild.roles.cache.find(
    (role) => role.name == 'Teacher'
  );

  let professor = teacherRole.members.first().user.username;
  let name = message.guild.name;

  const newGuild = new Guild({ name, professor });
  await newGuild.save();
};

module.exports.crateRoles = async (message) => {
  await crateTeacherRole(message);
  await createStudentRole(message);
  addStudentRole(message);
};

const crateTeacherRole = async function (message) {
  if (message.guild.roles.cache.some((role) => role.name == 'Teacher')) {
    return;
  }

  await message.guild.roles
    .create({
      data: {
        name: 'Teacher',
        color: 'RED',
        permissions: 'ADMINISTRATOR',
      },
      reason: 'This is the course teacher',
    })
    .then((role) => message.member.roles.add(role));
};

const createStudentRole = async function (message) {
  if (message.guild.roles.cache.some((role) => role.name == 'Student')) {
    return;
  }

  await message.guild.roles.create({
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
    reason: 'This is the course teacher',
  });

  message.reply('Student role created');
};

const addStudentRole = async function (message) {
  let studentRole = message.guild.roles.cache.find(
    (role) => role.name === 'Student'
  );

  for (let member of message.guild.members.cache.values()) {
    if (!member.roles.cache.some((role) => role.name == 'Teacher')) {
      await member.roles.add(studentRole);
    }
  }
};

module.exports.deleteRoles = async (message) => {
  for (let role of message.guild.roles.cache.values()) {
    try {
      await role.delete();
    } catch {}
  }
};

module.exports.deleteChannels = async function (message) {
  for (let channel of message.guild.channels.cache.values()) {
    if (
      channel.name != 'general' &&
      channel.name != 'General' &&
      channel.name != 'Voice Channels' &&
      channel.name != 'Text Channels'
    ) {
      try {
        await channel.delete();
      } catch {}
    }
  }
};

module.exports.createWorkstation = async function (message) {
  await createCategories(message);
  createChannels(message);
};

const createCategories = async function (message) {
  if (
    !message.guild.channels.cache.some(
      (channel) => channel.name === 'Class Text Channels'
    )
  ) {
    await message.guild.channels.create('Class Text Channels', {
      type: 'category',
    });
  }

  if (
    !message.guild.channels.cache.some(
      (channel) => channel.name === 'Class Voice Channels'
    )
  ) {
    await message.guild.channels.create('Class Voice Channels', {
      type: 'category',
    });

    if (
      !message.guild.channels.cache.some(
        (channel) => channel.name === 'Professor Private Channels'
      )
    ) {
      await message.guild.channels.create('Professor Private Channels', {
        type: 'category',
      });
    }
  }
};

const createChannels = (message) => {
  let textCategory = message.guild.channels.cache.find(
    (c) => c.name == 'Class Text Channels' && c.type == 'category'
  );

  let voiceCategory = message.guild.channels.cache.find(
    (c) => c.name == 'Class Voice Channels' && c.type == 'category'
  );

  let professorCategory = message.guild.channels.cache.find(
    (c) => c.name == 'Professor Private Channels' && c.type == 'category'
  );

  let studentRole = message.guild.roles.cache.find(
    (role) => role.name === 'Student'
  );

  let everyoneRole = message.guild.roles.cache.find(
    (role) => role.name === '@everyone'
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
      parent: textCategory.id,
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
      parent: textCategory.id,
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
      parent: textCategory.id,
      position: 3,
    });
  }

  //Voice channel Classroom
  if (
    !message.guild.channels.cache.some(
      (channel) => channel.name == '[🔊] Classroom' && channel.type == 'voice'
    )
  ) {
    message.guild.channels.create('[🔊] Classroom', {
      type: 'voice',
      reason: 'General text chat for all students',
      parent: voiceCategory.id,
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
      parent: voiceCategory.id,
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
      parent: voiceCategory.id,
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
      parent: voiceCategory.id,
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
      parent: voiceCategory.id,
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
      parent: voiceCategory.id,
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
      parent: voiceCategory.id,
      position: 7,
    });
  }

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
      parent: professorCategory.id,
      position: 1,
      permissionOverwrites: [
        {
          id: studentRole.id,
          deny: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL'],
          id: everyoneRole.id,
          deny: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL'],
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
      reason: 'Private voice channel to teachers',
      parent: professorCategory.id,
      position: 2,
      permissionOverwrites: [
        {
          id: studentRole.id,
          deny: ['CONNECT', 'SPEAK'],
          id: everyoneRole.id,
          deny: ['CONNECT', 'SPEAK'],
        },
      ],
    });
  }
};
