module.exports.doubtNotification = (message) => {
  let questionerName;
  let mentionTeacher = message.mentions.members.first();
  let mentionRole = message.mentions.roles.first();

  if (mentionTeacher === undefined && mentionRole === undefined) {
    return;
  }

  let teacherRole = message.guild.roles.cache.find(
    (role) => role.name == 'Teacher'
  );
  let teacher = teacherRole.members.first();
  let questioner = message.guild.members.cache.get(message.author.id);
  let serverName = message.guild.name;

  if (questioner.nickname != null) {
    questionerName = questioner.nickname;
  } else {
    questionerName = questioner.displayName;
  }

  teacher.send(
    `Hey ${teacher.displayName}!, ${questionerName} just asked a new question in ${serverName} (doubt channel)`
  );
};
