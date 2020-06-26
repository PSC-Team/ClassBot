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

module.exports.createWorkStation = async function (message) {
  await createCategories(message);
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
  }

  if (
    !message.guild.channels.cache.some(
      (channel) => channel.name === 'Professor Private Channels'
    )
  ) {
    await message.guild.channels.create('Professor Private Channels', {
      type: 'category',
    });
  }
};
