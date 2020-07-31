const { welcome, addNewStudentRole } = require('./Commands/welcome');
const { nickname } = require('./Commands/nickname');
const { notice } = require('./Commands/notice');
const { sendGrade } = require('./Commands/send-grade');
const { doubtNotification } = require('./Commands/doubt-notification');
const { addAssistant } = require('./Commands/add-assistant');
const { changeTeacher } = require('./Commands/change-teacher');
const {
  findGuild,
  addNewMember,
  removeMemberToGuild,
} = require('./database/functions');
const {
  deleteRoles,
  deleteChannels,
  crateRoles,
  createWorkstation,
  addGuildToDB,
  addMembersToDB,
} = require('./Commands/start');

const botCommands = {};

botCommands.memberAdded = async (member, Discord) => {
  let userId = member.user.id;
  let serverId = member.guild.id;

  welcome(member, Discord);
  addNewStudentRole(member);

  await addNewMember(userId, serverId);
};

botCommands.removeMember = async (member) => {
  let serverId = member.guild.id;
  let memberId = member.user.id;
  await removeMemberToGuild(serverId, memberId);
};

botCommands.start = async (message) => {
  let flag = message.content.includes('-d');

  if (flag == true) {
    await deleteRoles(message);
    await deleteChannels(message);
  }

  await crateRoles(message);
  createWorkstation(message);

  let guild = await findGuild(message);
  if (!guild) {
    await addGuildToDB(message);
  }

  await addMembersToDB(message);
};

botCommands.changeNickname = (message) => {
  nickname(message);
};

botCommands.serverNotice = (message, Discord) => {
  notice(message, Discord);
};

botCommands.teacherSendGrade = (message) => {
  sendGrade(message);
};

botCommands.teacherAddAssistant = (message) => {
  addAssistant(message);
};

botCommands.teacherChangeTeacher = (message) => {
  changeTeacher(message);
};

botCommands.studentDoubtNotification = (message) => {
  let doubtChannel;
  try {
    doubtChannel = message.guild.channels.cache.find(
      (channel) => channel.name == '🔎-doubts'
    );
  } catch (e) {}

  try {
    if (message.channel.id === doubtChannel.id) {
      doubtNotification(message);
    }
  } catch {}
};

module.exports = botCommands;
