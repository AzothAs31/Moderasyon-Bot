const { EmbedBuilder } = require('discord.js');
const { prefix } = require('../config.js');
const serverSettings = require('../Global/configs/sunucuayar.json');

exports.run = async (client, message, args) => {
    // Yetki kontrolü
    if (!message.member.permissions.has('MANAGE_ROLES')) {
        return message.reply('Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz!');
    }

    // Kullanımı kontrol et
    if (args.length !== 1) {
        return message.reply(`Kullanım: ${prefix}unmute <kullanıcı>`);
    }

    // Etiketlenen kullanıcıyı al
    const targetMember = message.mentions.members.first();

    // Kullanıcıyı bulamazsa hata mesajı gönder
    if (!targetMember) {
        return message.reply('Lütfen bir kullanıcı etiketleyin!');
    }

    // Mute rolünü al
    const muteRoleName = serverSettings.muteRole || 'Muted';
    const muteRole = message.guild.roles.cache.find(role => role.name === muteRoleName);

    // Mute rolü yoksa hata mesajı gönder
    if (!muteRole) {
        return message.reply('Mute rolü bulunamadı!');
    }

    // Kullanıcıdan mute rolünü kaldır
    await targetMember.roles.remove(muteRole);

    // Başarılı mesajını oluştur
    const embed = new EmbedBuilder()
        .setTitle('Kullanıcının Mutesi Kaldırıldı')
        .setDescription(`${targetMember} kullanıcısının mutesi kaldırıldı.`)
        .setColor('#00ff00');

    // Mesajı gönder
    message.channel.send({ embeds: [embed] });
};

exports.conf = {
    aliases: ['unsus', 'unmute'],
    cooldown: 5
};

exports.help = {
    name: 'unmute',
    description: 'Belirtilen kullanıcının mutesini kaldırır.',
    usage: `${prefix}unmute <kullanıcı>`
};