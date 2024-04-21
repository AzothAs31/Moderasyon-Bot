const { ButtonBuilder, Client, Message, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require("discord.js");
exports.run = async (client, message, args) => {
    const iEmbed = new EmbedBuilder()
    .setAuthor({ name: message.member.displayName, iconURL: message.author.avatarURL({dynamic:true}) })
    .setFooter({ text: ("DAŞAK")})
    .setColor("#030303")

if(!message.member.roles.cache.get(message.guild.roles.premiumSubscriberRole ? message.guild.roles.premiumSubscriberRole.id : "")) return message.reply({embeds: [iEmbed.setDescription(`Bu komutu kullanabilmek için ${message.guild.roles.premiumSubscriberRole ? `<@&${message.guild.roles.premiumSubscriberRole.id}>` : "Booster"} rolüne sahip olmalısın.`)]})
let iName = args.slice(0).join(' ');
if(!iName) return message.reply({embeds: [iEmbed.setDescription(`Bir isim belirtmelisin.`)]})
if(iName.length >= 24) return message.reply({embeds: [iEmbed.setDescription(`İsminiz maximum 24 karakter olmalıdır.`)]})
message.member.setNickname(iName).catch((err) => { })
message.reply({embeds: [iEmbed.setDescription(`İsminiz başarılı şekilde \`${iName}\` olarak düzenlendi.`)]})
};
exports.conf = {
  aliases: ["b", "z", "zengin", "boost"]
};

exports.help = {
  name: "booster"
}; 