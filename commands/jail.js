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

    const durationString = args[1];
    if (!durationString) return message.reply("Lütfen bir süre belirtin (örn: 10s, 5dk, 2h).");

    let duration;
    if (durationString.endsWith("sn")) {
        duration = parseInt(durationString) * 1000; // saniye * 1000 = milisaniye
    } else if (durationString.endsWith("dk")) {
        duration = parseInt(durationString) * 60 * 1000; // dakika * 60 * 1000 = milisaniye
    } else if (durationString.endsWith("h")) {
        duration = parseInt(durationString) * 60 * 60 * 1000; // saat * 60 * 60 * 1000 = milisaniye
    } else {
        return message.reply("Geçersiz zaman birimi. Lütfen sn (saniye), dk (dakika), h (saat) kullanın.");
    }

    try {
        await targetUser.roles.add(jailRole);
        message.reply(`**${targetUser.user.tag}** kullanıcısına jail rolü verildi. Süre: ${durationString}.`);

        setTimeout(async () => {
            await targetUser.roles.remove(jailRole);
            message.channel.send(`**${targetUser.user.tag}** kullanıcısının jail süresi doldu, jail rolü kaldırıldı.`);
        }, duration);
    } catch (error) {
        console.error(error);
        message.reply("Kullanıcıya jail rolü verilirken bir hata oluştu.");
    }
};

exports.conf = {
    aliases: ['hapis']
};

exports.help = {
    name: 'jail',
    description: 'Belirtilen kullanıcıya jail rolü verir ve belirtilen süre sonra otomatik olarak kaldırır.',
    usage: 'jail <@kullanıcı> <süre>'
};