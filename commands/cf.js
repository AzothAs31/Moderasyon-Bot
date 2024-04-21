const { EmbedBuilder } = require("discord.js");
const slenzydb = require("croxydb");

exports.run = async (client, message, args) => {
    const money = slenzydb.fetch(`para_${message.author.id}`);
    if (!money) return message.reply("Paranız yok.");
    
    const moneyPush = parseInt(args[0]);
    if (isNaN(moneyPush) || moneyPush <= 0) return message.reply("Lütfen geçerli bir miktar girin!");
    
    if (money < moneyPush) return message.reply("Yeterli paranız yok!");
    
    const mapping = ["true", "false"];
    const randomMapping = mapping[Math.floor(Math.random() * mapping.length)];
    
    if (randomMapping === "true") {
        message.channel.send("**Kazandınız, tebrikler!**");
        slenzydb.add(`para_${message.author.id}`, moneyPush * 2);
    } else {
        message.channel.send("**Kaybettiniz!**");
        slenzydb.add(`para_${message.author.id}`, -moneyPush);
    }
};

exports.conf = {
  aliases: ["cf"]
};

exports.help = {
  name: "cf"
};