
const { Permissions, EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
    // İzinleriniz
    const yetkiliIzinleri = [
        "ADMINISTRATOR",
        "MANAGE_ROLES"
    ];

    // Yetki kontrolü
    if (!message.member.permissions.has(yetkiliIzinleri)) {
        return message.reply("Bu komutu kullanma yetkiniz bulunmamakta.");
    }

    // Etiketlenen kullanıcıyı bulma
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.reply("Lütfen bir kullanıcı etiketleyin.");

    // Verilecek roller
    const yetkiliRoller = ["1225499491893776434", "1228636883010195557"];

    // Rolleri verme
    try {
        await member.roles.add(yetkiliRoller);
        const embed = new EmbedBuilder()
            .setFooter("AM");
        message.channel.send({ embeds: [embed] });
    } catch (error) {
        console.error(error);
        message.reply("Başarıyla Kullanıcıyı Yetkili Yaptınız.");
    }
};

exports.conf = {
    aliases: ['yetkiver']
};

exports.help = {
    name: 'yetkiver'
};
