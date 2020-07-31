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

dbFunctions.findMember = async (discordId) => {
  const member = await Member.findOne({ discordId });
  return member;
};

dbFunctions.addGuild = async (name, professor) => {
  const newGuild = new Guild({ name, professor });
};

dbFunctions.addGuild = async (serverId, professor) => {
  const newGuild = new Guild({ serverId, professor });
  await newGuild.save();
};

dbFunctions.addNewMember = async (guildId, discordId) => {
  const newMember = new Member({ discordId });
  newMember.guildsId.push(guildId);
  await newMember.save();
};

dbFunctions.addMembersToGuild = async (serverId, memberId) => {
  const guild = await Guild.findOne({ serverId });

  if (guild) {
    guild.students.push(memberId);
    await guild.save();
  }
};

module.exports = dbFunctions;
