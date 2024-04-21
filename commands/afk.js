const { EmbedBuilder } = require('discord.js');
const db = require('croxydb');

exports.run = async (client, message, args) => {
    const afkSebep = args.join(' ') || 'Belirtilmemiş'; // AFK sebebini al, belirtilmemişse varsayılan olarak 'Belirtilmemiş' kullan
    const afkID = message.author.id;

    // Eğer kullanıcı zaten AFK'daysa ve tekrar .afk komutunu kullanırsa, AFK durumunu kaldır
    const afkCheck = db.get(`afk_${afkID}`);
    if (afkCheck) {
        db.delete(`afk_${afkID}`);
        db.delete(`afkDate_${afkID}`);
        const removedAfkEmbed = new EmbedBuilder()
            .setColor('#1ED761')
            .setDescription(`${message.author}, AFK durumun başarıyla kaldırıldı.`);
        return message.reply({ embeds: [removedAfkEmbed], allowedMentions: { repliedUser: false } });
    }

    // Kullanıcıyı AFK olarak işaretle
    db.set(`afk_${afkID}`, afkSebep);

    // Başarılı yanıt gönder
    const successEmbed = new EmbedBuilder()
        .setColor('#1ED761')
        .setDescription(`Başarıyla AFK oldun!\nSebep: ${afkSebep}`);
    message.reply({ embeds: [successEmbed], allowedMentions: { repliedUser: false } });

    // Etiketlendiğinde AFK olan kullanıcıya bir mesaj gönder
    const mentionedUsers = message.mentions.users;
    mentionedUsers.forEach(user => {
        const afkEmbed = new EmbedBuilder()
            .setColor('#FF5733')
            .setDescription(`${user}, AFK olan ${message.author} sebep: ${afkSebep}`);
        message.channel.send({ embeds: [afkEmbed] });
    });
};

exports.conf = {
    aliases: ['afk', 'unafk']
};

exports.help = {
    name: 'afk',
    description: 'Kullanıcıyı AFK olarak işaretler.',
    usage: 'afk [sebep]'
};