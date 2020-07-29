const Guild = require('../models/guild');
const Member = require('../models/member');

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

dbFunctions.findMember = async (discord_id) => {
  const member = await Member.findOne({ discord_id });
  return member;
};

dbFunctions.addGuild = async (name, professor) => {
  const newGuild = new Guild({ name, professor });
  await newGuild.save();
};

dbFunctions.addNewMember = async (discord_id, guild_id) => {
  const newMember = new Member({ discord_id });
  newMember.guilds_id.push(guild_id);
  await newMember.save();
};

module.exports = dbFunctions;
