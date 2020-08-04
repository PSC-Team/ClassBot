const Guild = require('../models/guild');
const Member = require('../models/member');
const { db } = require('../models/guild');
const guild = require('../models/guild');

const dbFunctions = {};

dbFunctions.findGuild = async (message) => {
  let serverId = message.guild.id;
  const guild = await Guild.findOne({ serverId });
  return guild;
};

dbFunctions.findMember = async (discordId) => {
  const member = await Member.findOne({ discordId });
  return member;
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

dbFunctions.addGuildToMember = async (serverId, dbMember) => {
  dbMember.guildsId.push(serverId);
  await dbMember.save();
};

dbFunctions.removeMemberToGuild = async (serverId, memberId) => {
  const guild = await Guild.findOne({ serverId });

  if (guild) {
    guild.students.pull(memberId);
    await guild.save();
  }
};

dbFunctions.removeGuildToMember = async (serverId, memberId) => {
  let discordId = memberId;
  const member = await Member.findOne({ discordId });

  if (member) {
    member.guildsId.pull(serverId);
    await member.save();
  }
};

module.exports = dbFunctions;
