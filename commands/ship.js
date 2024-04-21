const canvafy = require("canvafy");
exports.run = async (client, message, args) => {
const randomMember = message.guild.members.cache.random()

let member = message.mentions.members.first()
   if(!member)return message.reply({content:"Seni Şipleyeceğim kişiyi etiketle"})
   const ship = await new canvafy.Ship()
   .setAvatars(message.author.displayAvatarURL({ forceStatic: true, extension: "png" }),member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
   .setBackground("image", "https://img.freepik.com/free-vector/gradient-valentine-s-day-background_23-2149242406.jpg")
   .setBorder("#f0f0f0")
   .setOverlayOpacity(0.5)
   .build();

   message.reply({
     files: [{
       attachment: ship,
       name: `ship-${message.member.id}.png`
     }]
    });

};
exports.conf = {
    aliases: []
};

exports.help = {
    name: "ship",
    description: "Etiketlediğiniz kişiye hediye alır.",
    usage: `ship @etiket`,
};

