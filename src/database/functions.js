const Guild = require('../models/guild');

const dbFunctions = {};

dbFunctions.findGuild = async (message) => {
  let name = message.guild.name;
  let teacherRole = message.guild.roles.cache.find(
    (role) => role.name == 'Teacher'
  );
  let professor = teacherRole.members.first().user.username;

  const guild = await Guild.findOne({ name, professor });
  return guild;
};

module.exports = dbFunctions;
