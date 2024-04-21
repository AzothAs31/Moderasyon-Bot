const { ButtonStyle } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');
const ayarlar = require('../config.js')

exports.run = async (client, message, args) => {

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('rol1')
                .setLabel('Hammer Rol')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('rol2')
                .setLabel('Punishment Rol')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('rol3')
                .setLabel('Staff Rol')
                .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                .setCustomId('iptal')
                .setLabel('İptal')
                .setStyle(ButtonStyle.Danger)
                .setDisabled(true)

        );

    let msg = await message.reply({
        content: `**${message.guild.name}** sunucusu \`ROL-KUR\` sistemi. İstediğiniz rolleri kurmak için aşağıdaki butonlara tıklamanız yeterli.
\`\`\`Hammer ROL → Hammer rollerini kurar, ve renklerini ayarlar.
Punishment ROL → Punishment rollerini kurar, ve renklerini ayarlar.
Staff ROL → Staff rollerini kurar, ve renklerini ayarlar.
İptal → İşlemi iptal eder.\`\`\`
            `, components: [row]
    });


    const filter = (i) => i.user.id === message.author.id

    const collector = await msg.channel.createMessageComponentCollector({ filter, max: 1 })

    collector.on("collect", async (button) => {

        if (button.customId === "rol1") {

            message.guild.roles.create({name: 'Ban Hammer', color: '#7473ec'})
            message.guild.roles.create({name: 'Jail Hammer', color: '#7473ec'})
            message.guild.roles.create({name: 'Transport Hammer', color: '#7473ec'})
            message.guild.roles.create({name: 'Mute Hammer', color: '#7473ec'})
            message.guild.roles.create({name: 'Warn Hammer', color: '#7473ec'})
            message.guild.roles.create({name: 'Bot Commands', color: '#7473ec'})
            message.guild.roles.create({name: 'Register Hammer', color: '#7473ec'})

            await button.reply({ content: `Sunucu Hammer Rolleri Başarıyla Kuruldu. ${ayarlar.yes}`, ephemeral: false })
        }

  

    if (button.customId === "rol2") {

        message.guild.roles.create({name: 'Jail', color: '#ff0000'})
        message.guild.roles.create({name: 'Chat Muted', color: '#ff0000'})
        message.guild.roles.create({name: 'V.Muted', color: '#ff0000'})
        message.guild.roles.create({name: 'Şüpheli Hesap', color: '#ff0000'})
        message.guild.roles.create({name: 'Reklam', color: '#ff0000'})

        await button.reply({ content: `Punishment Rolleri Başarıyla Kuruldu. ${ayarlar.yes}`, ephemeral: false })
    }
    if (button.customId === "rol3") {

        message.guild.roles.create({name: 'Owner.', color: '#23b8bd'})
        message.guild.roles.create({name: 'Founder.', color: '#23b8bd'})
        message.guild.roles.create({name: 'Admin', color: '#23b8bd'})
        message.guild.roles.create({name: 'Ceo', color: '#23b8bd'})
        message.guild.roles.create({name: 'Staff', color: '#23b8bd'})
        message.guild.roles.create({name: 'Staff', color: '#23b8bd'})
        message.guild.roles.create({name: 'Staff', color: '#23b8bd'})
        message.guild.roles.create({name: 'Staff', color: '#23b8bd'})
        message.guild.roles.create({name: 'Staff', color: '#23b8bd'})
        message.guild.roles.create({name: 'Staf Role', color: '#23b8bd'})


        await button.reply({ content: `Staff Rolleri Başarıyla Kuruldu. ${ayarlar.yes}`, ephemeral: false })
    }
    
})
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kurulum"]
}
exports.help = {
    name: "kur"
}