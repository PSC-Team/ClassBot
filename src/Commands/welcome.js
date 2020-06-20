module.exports.welcome = function (member, Discord) {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === 'general'
  );

  let serverName = member.guild.name;

  if (!channel) return;

  const messageEmbed = new Discord.MessageEmbed()
    .setColor('#41e6a4')
    .setTitle(
      `Welcome ${member.displayName} to the Course ${serverName} server.`
    )
    .setDescription(
      'Please type the command "!nickname" and forward your full name, so that your teacher can recognize you within this server.'
    )
    .setThumbnail(
      'https://i.pinimg.com/originals/98/d3/a2/98d3a283f98cded8e639957e935bd373.png'
    );

  channel.send(member.toString());
  channel.send(messageEmbed);
};

module.exports.addNewStudentRole = function (member) {
  const studentRole = member.guild.roles.cache.find(
    (role) => role.name === 'Student'
  );

  if (!studentRole) {
    return;
  }

  member.roles.add(studentRole);
};
