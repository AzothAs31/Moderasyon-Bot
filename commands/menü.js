const { ButtonStyle } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require('discord.js');
const ayarlar = require('../Global/configs/sunucuayar.json');
const config = require('../config.js')
exports.run = async (client, message, args) => {
    const prefix = config.prefix;
    const roller = ayarlar.roller;

    if (!message.member.permissions.has(PermissionsBitField.MANAGE_ROLES)) 
        return message.reply("Bu komutu kullanabilmek için yeterli izne sahip değilsiniz.");

    const selectMenuOptions = [];
    for (const [rolAdi, rolID] of Object.entries(roller)) {
        selectMenuOptions.push({ label: rolAdi, value: rolID });
    }

    const selectMenu = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('rolal-button')
            .setLabel('Rol Al')
            .setStyle(ButtonStyle.Primary)
    );

    const embed = {
        color: 0x00ff00,
        title: 'Rol Alma Menüsü',
        description: 'Aşağıdan istediğin rolü seçebilirsin.'
    };

    const reply = await message.reply({ embeds: [embed], components: [selectMenu] });

    const filter = i => i.customId === 'rolal-button' && i.user.id === message.author.id;

    const collector = reply.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async interaction => {
        const selectedRoleID = interaction.values[0];
        const selectedRole = message.guild.roles.cache.get(selectedRoleID);
        if (!selectedRole) return interaction.reply({ content: "Seçilen rol bulunamadı.", ephemeral: true });

        try {
            await interaction.member.roles.add(selectedRole);
            interaction.reply({ content: `Başarıyla ${selectedRole.name} rolünü aldınız.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: "Rol alınırken bir hata oluştu.", ephemeral: true });
        }
    });

    collector.on('end', () => {
        reply.edit({ components: [] });
    });
};

exports.conf = {
    aliases: ['menü','rolmenü']
};

exports.help = {
    name: 'menü',
    description: 'Butona basılarak menülü bir şekilde rol almanızı sağlar.',
    usage: 'rolmenü'
};