const { EmbedBuilder } = require("discord.js");

exports.run = async (client, message, args) => {
  let iMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

  const iEmbed = new EmbedBuilder()
  .setAuthor({ name: message.member.displayName, iconURL: message.member.avatarURL({dynamic:true}) })
  .setFooter({ text: "Created by Emdocs" })
  .setColor("LuminousVividPink")

  if (iMember.presence == null) return message.reply({ embeds: [iEmbed.setDescription(`**Belirttiğiniz kullanıcı şu anda aktif değil.**`)] })
  
  let fistik = Object.keys(iMember.presence.clientStatus)

  let iDevice = { desktop: "💻 PC / App", mobile: "📱 Mobile / App", web: "🌐 Tarayıcı" }
  let iPresence = { online: "🟢", dnd: "🔴", idle: "🟡", offline: "⚪" }

    iEmbed.addFields(
      { name: `Kullanıcı`, value: `${iMember} **/ ${iMember.id}**`, inline: false},
      { name: `Kullanıcının durumu`, value: `${fistik.map(x => `\`${iPresence[iMember.presence.status]}\` \`${iDevice[x]}\``).join("\n")}`, inline: false})

  message.reply({ embeds: [iEmbed]});

};
exports.conf = {
  aliases: ["chz", "durum"]
};

exports.help = {
  name: "cihaz"
}; 