module.exports.addAssistant = async (message) => {
  let mention = message.mentions.users.first();

  //Checks if there is a mention
  if (mention === undefined) {
    message.reply('Please mention someone valid');
    return;
  }

  const studentRole = message.guild.roles.cache.find(
    (role) => role.name === 'Student'
  );

  //Deletes the assistant teacher role
  if (
    message.guild.roles.cache.some((role) => role.name == 'Assistant Teacher')
  ) {
    let assistantRole = message.guild.roles.cache.find(
      (role) => role.name === 'Assistant Teacher'
    );
    await assistantRole.members.first().roles.add(studentRole);
    await deleteRole(message);
  }

  //Creates the role
  await createAssistant(message);

  let assistantRole = message.guild.roles.cache.find(
    (role) => role.name === 'Assistant Teacher'
  );

  let user = message.guild.members.cache.get(mention.id);

  //Adds the assistant role and deletes Student role to user mentioned
  await user.roles.add(assistantRole);
  await user.roles.remove(studentRole);

  let name = '';
  if (user.nickname != null) {
    name = user.nickname;
  } else {
    name = user.user.username;
  }

  message.reply(`The role of assistant professor was added to ${name}!`);
};

const createAssistant = async (message) => {
  await message.guild.roles.create({
    data: {
      name: 'Assistant Teacher',
      color: 'ORANGE',
      permissions: [
        'KICK_MEMBERS',
        'MANAGE_CHANNELS',
        'MANAGE_MESSAGES',
        'MANAGE_EMOJIS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'CREATE_INSTANT_INVITE',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'CONNECT',
        'SPEAK',
        'CHANGE_NICKNAME',
        'ATTACH_FILES',
      ],
    },
    reason: 'This is the course assistant',
  });
};

const deleteRole = async (message) => {
  let assistantRole = message.guild.roles.cache.find(
    (role) => role.name === 'Assistant Teacher'
  );
  await assistantRole.delete();
};
