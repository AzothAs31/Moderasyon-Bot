const { CommandInteraction, MessageEmbed } = require('discord.js');
const moment = require('moment');
const snipe = require('../Global/schemas/snipe');

    exports.run = async(interaction = new CommandInteraction()) => {
        const data = await snipe.findOne({ guildID: interaction.guild.id, channelID: interaction.channel.id });
        if (!data) {
            return interaction.reply({ content: 'Bu kanalda silinmiş bir mesaj bulunmuyor!', ephemeral: true });
        }

        const { messageContent, userID, createdDate, deletedDate } = data;

        const user = await interaction.client.users.fetch(userID);
        const hembed = new MessageEmbed()
            .setColor('#330066')
            .setDescription(`Silinen Mesaj: ${messageContent}`)
            .addField('Mesaj Sahibi', `<@${userID}> - (\`${userID}\`)`)
            .addField('Mesajın Yazılma Tarihi', moment.duration(Date.now() - createdDate).format("D [gün], H [saat], m [dakika], s [saniye]") + ' önce')
            .addField('Mesajın Silinme Tarihi', moment.duration(Date.now() - deletedDate).format("D [gün], H [saat], m [dakika], s [saniye]") + ' önce');

        return interaction.reply({ embeds: [hembed], ephemeral: true });
    }
exports.conf = {
    aliases: ["snipe","sn"]
}
exports.help = {
    name: "snipe"
}