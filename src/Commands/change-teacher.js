const Guild = require('../models/guild');

module.exports.changeTeacher = async (message) => {
  let serverId = message.guild.id;
  let idAuthor = message.author.id;
  let memberAuthor = message.guild.members.cache.get(idAuthor);

  let idMention = message.mentions.users.first().id;
  let memberMention = message.guild.members.cache.get(idMention);

  let professor = memberMention.user.id;

  for (let role of memberAuthor.roles.cache.values()) {
    if (role.name == 'Teacher') {
      await memberMention.roles.add(role);
      await memberAuthor.roles.remove(role);
    }
  }

  for (let role of memberMention.roles.cache.values()) {
    if (role.name == 'Student') {
      await memberAuthor.roles.add(role);
      await memberMention.roles.remove(role);
    }
  }

  await Guild.findOneAndUpdate({ serverId }, { professor });
};
