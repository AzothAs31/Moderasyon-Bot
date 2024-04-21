const { Collection } = require('discord.js');
const config = require('../Global/configs/chatguard.json');

const küfürler = config.küfürler || [];

exports.run = async (client, message, args) => {
    // Mesajı kontrol et
    const msgContent = message.content.toLowerCase();
    const msgWords = msgContent.split(/\s+/);

    for (const word of msgWords) {
        if (küfürler.includes(word)) {
            // Küfür bulundu, mesajı sil
            message.delete()
                .then(() => {
                    message.reply('Küfür içeren bir mesaj gönderemezsin.');
                })
                .catch(error => {
                    console.error('Mesaj silinirken bir hata oluştu:', error);
                });
            return;
        }
    }
};

exports.conf = {
    aliases: ['küfürengel']
};

exports.help = {
    name: 'chatguard',
    description: 'Küfür içeren mesajları siler.',
    usage: 'chatguard'
};