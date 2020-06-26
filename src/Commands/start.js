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
      parent: professorCategory.id,
      position: 2,
    });
  }
};
