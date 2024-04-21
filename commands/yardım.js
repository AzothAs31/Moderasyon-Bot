const { ActionRowBuilder, SelectMenuBuilder, EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
    const embed = new EmbedBuilder()
        .setTitle('Yardım Menüsü')
        .setDescription('Aşağıda Oluştan Menüden  Bot Komutlarını İncelemek İçin Menüye Tıklayabilirsin!       Açılan Menüyü Aşağıya Kaydırarak Detaylı Komutlara Ulaşabilirsin. ')
        .setColor('#11806A');
        

    const selectMenu = new SelectMenuBuilder()
        .setCustomId('help_menu')
        .setPlaceholder('Yardım kategorisini listeden seçin!')
        .addOptions([
            {
                label: 'Kullanıcı Komutları',
                description: 'Kullanıcı Komutları',
                value: 'Kullanıcı'
            },
            {
                label: 'Yetkili Komutları',
                description: 'Yetkili Komutları',
                value: 'Yetkili'
            },
            {
                label: 'Cezalandırma Komutları',
                description: 'Cezalandırma Komutları',
                value: 'Cezalandırma'
            },
            {
                label: 'BotOwner Komutları',
                description: 'BotOwner Komutları',
                value: 'BotOwner'
            },
            {
                label: 'Kurucu Komutları',
                description: 'Kurucu Komutları',
                value: 'Kurucu'
            },
            {
                label: 'Register Komutları',
                description: 'Register Komutları',
                value: 'Register'
            },
            {
                label: 'Economy Komutları',
                description: 'Economy Komutları',
                value: 'Economy'
            }

        ]);

    const row = new ActionRowBuilder().addComponents(selectMenu);

    const messageSent = await message.channel.send({ embeds: [embed], components: [row] });

    const filter = i => i.customId === 'help_menu' && i.user.id === message.author.id;

    const collector = message.channel.createMessageComponentCollector({ filter });

    collector.on('collect', async interaction => {
        const value = interaction.values[0];
        let commandList;

        if (value === 'Kullanıcı') {
            commandList = `
            \`- .afk <sebep>\`
            \`- .avatar <Emdocs/İD>\`
            \`- .cihaz <Emdocs/İD>\`
            \`- .kullanıcı-bilgi <Emdocs/İD>\`
            \`- .ship <Emdocs/İD>\`
            \`- .spotify <Emdocs/İD>\`
            \`- .banner <Emdocs/İD>\``;
        } else if (value === 'Yetkili') {
            commandList = `
            \` - .say\`
            \` - .sil\`
            \` - .yetkiver\`
            \`- .snipe\``;
        } else if (value === 'Cezalandırma') {
            commandList = `
            \`- .ban <Emdocs/İD>\`
            \`- .jail <Emdocs/İD>\`
            \`- .mute <Emdocs/İD>\`
            \`- .unban <Emdocs/İD>\`
            \`- .unjail <Emdocs/İD>\`
            \`- .unmute <Emdocs/İD>\``;

            } else if (value === 'BotOwner') {
                commandList = `
                    \`- .eval\`
                    \`- .kur\`
                    \`- .botsettings\`
                    \`- .panel\`
                    \`- .rolguard\`
                    \`- .yaz\`
                    \`- .ping\`
                    \`- .para-ekle\`
                    \`- .para-sil\`
                    \`- .cezabutton\`
                    \`- .menü\`
                    \`- .guard\``;
                } else if (value === 'Kurucu') {
                    commandList = `
                    \`- .server\`
                    \`- .kayıtbutton\`
                    \`- .lock\``;
                    } else if (value === 'Register') {
                        commandList = `
                        \`- .kayıt <Emdocs/İd>\`
                        \`- .isim <Emdocs/İd>\`
                        \`- .globalname <Emdocs/İd>\``;
                    } else if (value === 'Economy') {
                        commandList = `
                        \`- .banka\`
                        \`- .çal\`
                        \`- .çalış\`
                        \`- .cf\`
                        \`- .satın-al\`
                        \`- .coin\`
                        \`- .daily\`
                        \`- .hesap-oluştur\`
                        \`- .market\`
                        \`- .para-çek\`
                        \`- .para-gönder <Emdocs/İD>\`
                        \`- .para-yatır\``;
                }




        const responseEmbed = new EmbedBuilder()
            .setTitle(`${value} Komutları`)
            .setDescription(commandList)
            .setColor('#11806A');

        await interaction.update({ embeds: [responseEmbed], components: [row] });
    });
};

exports.conf = {
    aliases: ["yardım", "help,"]
};

exports.help = {
    name: "yardım"
};
