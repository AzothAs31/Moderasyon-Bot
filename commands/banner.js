const { MessageAttachment, createCanvas, loadImage } = require('canvas');

exports.run = async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;

    // Kullanıcının avatarını yükle
    const avatarURL = user.displayAvatarURL({ format: 'png', size: 512 });

    // Kullanıcının ismini al
    const userName = user.username;

    // Canvas oluştur
    const canvas = createCanvas(800, 300);
    const ctx = canvas.getContext('2d');

    // Arka plan rengini ayarla
    ctx.fillStyle = '#7289DA'; // Discord mavisi
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Kullanıcının avatarını çiz
    const avatar = await loadImage(avatarURL);
    ctx.drawImage(avatar, 50, 50, 200, 200);

    // Metin rengini ayarla
    ctx.fillStyle = '#FFFFFF'; // Beyaz
    ctx.font = 'bold 30px sans-serif';
    ctx.textAlign = 'center';

    // Kullanıcı adını çiz
    ctx.fillText(userName, canvas.width / 2, canvas.height - 50);

    // Canvas'ı mesaj olarak gönder
    const attachment = new MessageAttachment(canvas.toBuffer(), 'banner.png');
    message.channel.send({ files: [attachment] });
};

exports.conf = {
    aliases: ['userbanner', 'avatarbanner']
};

exports.help = {
    name: 'userbanner',
    description: 'Etkiketlenen kullanıcının avatarını ve ismini bir banner olarak gösterir.',
    usage: 'userbanner [@kullanıcı]'
};