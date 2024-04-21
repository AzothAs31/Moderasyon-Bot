const { PermissionsBitField } = require('discord.js');
const config = require('../Global/configs/sunucuayar.json');

const sahipRolü = config.sahipRolü || [];

exports.run = async (client, message, args) => {
    const BotOwners = config.BotOwners || [];
    const sahipRolü = config.sahipRolü || [];
    const rolsilme = config.rolsilme || 3; // Varsayılan olarak 3 rol silme işlemi

    // Komutu kullanan kişi sınırlı kullanıcılar veya roller listesinde mi?
    if (BotOwners.includes(message.author.id) || message.member.roles.cache.some(role => sahipRolu.includes(role.id))) {
        return message.reply("Üzgünüz, bu komutu kullanmaya yetkiniz yok.");
    }

    // Silinen rol sayısı kontrolü
    const fetchedLogs = await message.guild.fetchAuditLogs({
        limit: rolsilme,
        type: 'ROLE_DELETE'
    });
    
    const deletedRoles = fetchedLogs.entries.filter(entry => {
        const { target } = entry;
        return target && target.id !== message.guild.id;
    });

    // Silinen rollerin yazarları arasında döngü
    deletedRoles.forEach(entry => {
        const { executor, target } = entry;
        const executorMember = message.guild.members.cache.get(executor.id);
        
        // Eğer güvenli rollerdeyse veya komutu kullanan kişi ise işlem yapma
        if (executorMember && (sahipRolü.includes(target.id) || executor.id === message.author.id)) return;

        // Eğer silinen rol sayısı banlama sınırını aşıyorsa kullanıcıyı banla
        if (deletedRoles.length >= rolsilme) {
            executorMember.ban({ reason: "Rol silme sınırını aştı." })
                .then(() => {
                    message.channel.send(`${executor.tag} kullanıcısı rol silme sınırını aştığı için banlandı.`);
                })
                .catch(error => {
                    console.error(error);
                    message.channel.send("Kullanıcıyı banlarken bir hata oluştu.");
                });
        }
    });
};

exports.conf = {
    aliases: ['rolban aç',"rolguard","rolguard-aç"]
};

exports.help = {
    name: 'rolguard',
    description: 'Sunucudan rol silen kullanıcıları banlar.',
    usage: '.rolguard-aç'
};