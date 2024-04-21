const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;
    
    // Kullanıcının aktivitelerini al
    const activities = user.presence.activities;

    // Spotify aktivitesini bul
    const spotifyActivity = activities.find(activity => activity.type === 'LISTENING' && activity.name === 'Spotify');

    if (!spotifyActivity) {
        return message.channel.send(`${user.tag} kullanıcısı Spotify üzerinden şu anda bir şey dinlemiyor.`);
    }

    // Şarkı bilgilerini al
    const song = spotifyActivity.details;
    const artist = spotifyActivity.state;
    const albumArt = spotifyActivity.assets.largeImageURL();

    // Embed oluştur
    const embed = new EmbedBuilder()
        .setColor('#1ED761')
        .setTitle(`${user.tag} Spotify Bilgisi`)
        .setDescription(`Şu anda Spotify'da **${song}** adlı şarkıyı dinliyor.`)
        .addFields('Sanatçı', artist)
        .setThumbnail(albumArt);

    message.channel.send({ embeds: [embed] });
};

exports.conf = {
    aliases: ['spotify']
};

exports.help = {
    name: 'spotify',
    description: 'Kullanıcının Spotify bilgisini gösterir.',
    usage: 'spotify [kullanıcı]'
};