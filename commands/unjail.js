const { PermissionsBitField } = require('discord.js');
const { jailRoleID } = require('../Global/configs/sunucuayar.json');
const { prefix } = require('../config.js')

exports.run = async (client, message, args) => {
    if (!message.member.roles.cache.some(role => role.permissions.has(PermissionsBitField.MANAGE_ROLES))) 
        return message.reply("Bu komutu kullanabilmek için yeterli izne sahip değilsiniz.");

    const targetUser = message.mentions.members.first();
    if (!targetUser) return message.reply("Lütfen bir kullanıcı etiketleyin.");

    const jailRole = message.guild.roles.cache.get(jailRoleID);
    if (!jailRole) return message.reply("Jail rolü bulunamadı.");

    try {
        if (!targetUser.roles.cache.has(jailRoleID))
            return message.reply("Bu kullanıcı jailde değil.");

        await targetUser.roles.remove(jailRole);
        message.reply(`**${targetUser.user.tag}** kullanıcısının jail rolü kaldırıldı.`);
    } catch (error) {
        console.error(error);
        message.reply("Kullanıcıdan jail rolü kaldırılırken bir hata oluştu.");
    }
};

exports.conf = {
    aliases: ['unjail']
};

exports.help = {
    name: 'unjail',
    description: 'Belirtilen kullanıcının jail rolünü kaldırır.',
    usage: 'unjail <@kullanıcı>'
};