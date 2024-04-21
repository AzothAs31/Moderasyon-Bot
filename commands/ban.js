const { PermissionsBitField } = require('discord.js');

exports.run = async (client, message, args) => {
    const member = message.guild.members.resolve(message.author);
    if (!member.permissions.has(PermissionsBitField.BAN_MEMBERS)) 
        return message.reply("Bu komutu kullanabilmek için yeterli izne sahip değilsiniz.");

    const user = message.mentions.users.first();
    if (!user) 
        return message.reply("Lütfen yasaklanacak kullanıcıyı etiketleyin.");

    const targetMember = message.guild.members.resolve(user);
    if (!targetMember) 
        return message.reply("Belirtilen kullanıcı sunucuda bulunamadı.");

    if (!targetMember.bannable) 
        return message.reply("Belirtilen kullanıcıyı yasaklamak için gerekli izne sahip değilim.");

    const reason = args.slice(1).join(" ") || "Belirtilmedi";

    await targetMember.ban({ reason })
        .then(() => message.reply(`${user.tag} kullanıcısı başarıyla yasaklandı. Sebep: ${reason}`))
        .catch(error => {
            console.error(`Bir hata oluştu: ${error}`);
            message.reply("Kullanıcıyı yasaklama işlemi sırasında bir hata oluştu.");
        });
};

exports.conf = {
    aliases: ['banhammer']
};

exports.help = {
    name: 'ban',
    description: 'Belirtilen kullanıcıyı sunucudan yasaklar.',
    usage: 'ban <@kullanıcı> [sebep]'
};