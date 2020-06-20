module.exports.hello = 'Hello World!';

module.exports.createRoles = function (message) {
  if (message.guild.roles.cache.some((role) => role.name === 'Teacher')) {
    message.reply('There´s already a role of teacher in your server');
    return;
  }
  // Creates a new role
  message.guild.roles
    .create({
      data: {
        name: 'Teacher',
        color: 'RED',
        permissions: 'ADMINISTRATOR',
      },
      reason: 'Test for roles',
    })
    .then(console.log)
    .catch(console.error);
  if (message.guild.roles.cache.some((role) => role.name === 'Student')) {
    message.reply('There´s already a role of student in your server');
    return;
  }
};
