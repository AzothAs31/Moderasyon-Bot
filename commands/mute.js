const { PermissionsBitField } = require('discord.js');
const { prefix } = require('../config.js');
const { muteRoleID } = require('../Global/configs/sunucuayar.json')

exports.run = async (client, message, args) => {
    if (!message.member.roles.cache.some(role => role.permissions.has(PermissionsBitField.MUTE_MEMBERS))) 
        return message.reply("Bu komutu kullanabilmek için yeterli izne sahip değilsiniz.");

    const targetUser = message.mentions.members.first();
    if (!targetUser) return message.reply("Lütfen bir kullanıcı etiketleyin.");

    const muteRole = message.guild.roles.cache.get(muteRoleID);
    if (!muteRole) return message.reply("Mute rolü bulunamadı.");

    const durationString = args[1];
    if (!durationString) return message.reply("Lütfen bir süre belirtin (örn: 10sn, 5dk, 2h).");

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
        await targetUser.roles.add(muteRole);
        message.reply(`**${targetUser.user.tag}** kullanıcısına mute rolü verildi. Süre: ${durationString}.`);

        setTimeout(async () => {
            await targetUser.roles.remove(muteRole);
            message.channel.send(`**${targetUser.user.tag}** kullanıcısının mute süresi doldu, mute rolü kaldırıldı.`);
        }, duration);
    } catch (error) {
        console.error(error);
        message.reply("Kullanıcıya mute rolü verilirken bir hata oluştu.");
    }
};

exports.conf = {
    aliases: ['mute']
};

exports.help = {
    name: 'mute',
    description: 'Belirtilen kullanıcıya mute rolü verir ve belirtilen süre sonra otomatik olarak kaldırır.',
    usage: 'mute <@kullanıcı> <süre>'
};