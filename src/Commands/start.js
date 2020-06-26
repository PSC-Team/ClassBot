module.exports.deleteRoles = async (message) => {
  for (let role of message.guild.roles.cache.values()) {
    try {
      await role.delete();
    } catch {}
  }
  message.reply('Terminamos de eliminar roles');
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
  message.reply('Terminamos de eliminar canales');
};
