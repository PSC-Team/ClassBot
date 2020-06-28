module.exports.addAssistant = (message) => {
    if (
        message.guild.roles.cache.some((role) => role.name == 'Assistant Teacher')
    ) {
        return;
    }

    await message.guild.roles
        .create({
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
            reason: 'This is the course teacher',
        })
        .then((role) => {
            message.member.roles.add(role);
        });

    message.reply('Assistant Teacher role created');
};