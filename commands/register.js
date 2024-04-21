const { ButtonBuilder, Client, Message, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require("discord.js");
let ayar = require("../config.js"); 
const moment = require("moment");
require("moment-duration-format");
const client = global.bot;

  
    exports.run = async (client, message, args) => {
      if (!message.member.roles.cache.has(ayar.registerstaff) && !message.member.permissions.has("Administrator")) return message.reply({ content : `> **Bu komutu kullanmak için yetkin bulunmamaktadır!**`}).then((e) => setTimeout(() => { if(e.deletable){e.delete()}; }, 10000));

let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.reply({content : ` Kayıt Edilecek Üyeyi Belirtmeyi Unuttun`})
if(member.id === message.author.id) return message.reply({content : `Kendini kayıt edemezsin.`})
if(member.id === message.guild.ownerID) return message.reply({content : `**Sunucu sahibini kayıt edemezsin!**`})
if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply({content :`**Kendinizle Aynı Rolde Veya Üst Rolde Olan Birisini Kayıt Edemezsin.**`})
    
    let name = args[1]
    if(!name) return message.reply({content : ' İsim belirtmelisin. `Örn:Emir 18`'})
    let age = args[2]
    if(!age || isNaN(age)) return message.reply({content : '> Yaş belirtmelisin.`Örn:Emir 18`'})

const kanal1 = member.guild.channels.cache.find(r => r.id === (ayar.registerlog)); 
const button1 = new ButtonBuilder().setCustomId('erkek').setLabel("Erkek").setStyle(1).setEmoji("1227950398535634974")
const button2 = new ButtonBuilder().setCustomId('kiz').setLabel("Kadın").setStyle(2).setEmoji("1227950158944145448")
const button4 = new ButtonBuilder().setCustomId('iptal').setLabel("İptal").setStyle(4).setEmoji("1229493628053749761")
const emdocsbuton = new ButtonBuilder().setCustomId('lgbt').setLabel("Kaydı Tamamlandı").setStyle(2).setDisabled(true).setEmoji("1227950539837276210")
const emdocsbuton2 = new ButtonBuilder().setCustomId('hg').setLabel("Aramıza Hoş Geldin").setStyle(4).setEmoji("🎉").setDisabled(true)


const embed = new EmbedBuilder()
.setAuthor({ name: `${message.guild.name}`})
.setColor("#030303")
.setFooter({ text: (ayar.footer)})
.setThumbnail(message.guild.iconURL())
.setDescription(`${uye} üyesinin ismi ${name} olarak değiştirilecek.
Kayıdu tamamlamak için altaki butonları kullanın iptal etmek istiyorsanız iptal butonuna basman yeterli.`)

let emdocs1 = new EmbedBuilder()
.setDescription(`
${uye} sunucumuza <@${message.author.id}> tarafından, \`${name}\` ismiyle ${ayar.kizrolleri.length > 1 ? ayar.kizrolleri.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + ayar.kizrolleri.map(x => `<@&${x}>`).slice(-1) : ayar.kizrolleri.map(x => `<@&${x}>`).join("")} rolleri verilerek kayıt edildi. 
`)
.setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
.setThumbnail(uye.user.displayAvatarURL({ dynamic: true, size: 2048 }))
.setFooter({ text:(ayar.footer) })

let emdocs2 = new EmbedBuilder()
.setDescription(`
${uye} sunucumuza <@${message.author.id}> tarafından, \`${name}\` ismiyle ${ayar.erkekrolleri.length > 1 ? ayar.erkekrolleri.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + ayar.erkekrolleri.map(x => `<@&${x}>`).slice(-1) : ayar.erkekrolleri.map(x => `<@&${x}>`).join("")} rolleri verilerek kayıt edildi! 
`)
.setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
.setThumbnail(uye.user.displayAvatarURL({ dynamic: true, size: 2048 }))
.setFooter({ text:(ayar.footer) })

let emdocs3 = new EmbedBuilder()
.setDescription(`
${uye} sunucumuza <@${message.author.id}> tarafından, \`${name}\` ismiyle ${ayar.lgbt.length > 1 ? ayar.lgbt.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + ayar.lgbt.map(x => `<@&${x}>`).slice(-1) : ayar.lgbt.map(x => `<@&${x}>`).join("")} rolleri verilerek kayıt edildi! 
`)
.setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
.setThumbnail(uye.user.displayAvatarURL({ dynamic: true, size: 2048 }))
.setFooter({ text:(ayar.footer) })


const row = new ActionRowBuilder()
.addComponents([button1,button2,button4])
const row2 = new ActionRowBuilder()
.addComponents([emdocsbuton])
const row3 = new ActionRowBuilder()
.addComponents([emdocsbuton])

const msg = await message.reply({ embeds: [embed], components: [row] });

var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })

collector.on("collect", async (button) => {

     if (button.customId === "erkek") {
        uye.roles.cache.has(ayar.erkekrolleri) ? uye.roles.remove(ayar.erkekrolleri) : uye.roles.add(ayar.erkekrolleri);
        if(!uye.roles.cache.has(ayar.erkekrolleri)) {
          member.setNickname(`${name} | ${age}`)
        member.roles.remove(ayar.kayıtsız)
        msg.edit({embeds: [emdocs2], components: [row2] });
        if(ayar.chat && client.channels.cache.has(ayar.chat)) client.channels.cache.get(ayar.chat).send({ content:`Aramıza hoşgeldin **${uye}**! Kuralları okumayı unutma!`, components: [row3] }).then((e) => setTimeout(() => { e.delete(); }, 20000));
        kanal1.send({ embeds: [emdocs2], components: [row2] })
        }
     }

     if (button.customId === "kiz") {
        uye.roles.cache.has(ayar.kizrolleri) ? uye.roles.remove(ayar.kizrolleri) : uye.roles.add(ayar.kizrolleri);
        if(!uye.roles.cache.has(ayar.kizrolleri)) {
        member.setNickname(`${name} | ${age}`)
        member.roles.remove(ayar.kayıtsız)
        msg.edit({embeds:[emdocs1], components: [row2] });
          if(ayar.chat && client.channels.cache.has(ayar.chat)) client.channels.cache.get(ayar.chat).send({ content:`Aramıza hoşgeldin **${uye}**! Kuralları okumayı unutma!`, components: [row3] }).then((e) => setTimeout(() => { e.delete(); }, 20000));
          kanal1.send({embeds:[emdocs2], components: [row2] })
        }
     }

     if (button.customId === "lgbt") {
        uye.roles.cache.has(ayar.lgbt) ? uye.roles.remove(ayar.lgbt) : uye.roles.add(ayar.lgbt);
        if(!uye.roles.cache.has(ayar.lgbt)) {
          member.setNickname(`${name} | ${age}`)
        member.roles.remove(ayar.kayıtsız)
        msg.edit({embeds: [emdocs3], components: [row2] });
        if(ayar.chat && client.channels.cache.has(ayar.chat)) client.channels.cache.get(ayar.chat).send({ content:`Aramıza hoşgeldin **${uye}**! Kuralları okumayı unutma!`, components: [row3] }).then((e) => setTimeout(() => { e.delete(); }, 20000));
        kanal1.send({ embeds: [emdocs3], components: [row2] })
        }
     }

     if (button.customId === "iptal") {
        if(msg) msg.delete();
        button.reply({ content:`> Başarıyla İptal Ettiniz! Developer By Emdocs.`, embeds: [], components: [], ephemeral: true});
     }



    })

}


exports.conf = {
    aliases: ["kayit", "kayıt", "kadın", "Kadın", "k", "kadin", "Kadin", "Woman", "kız", "Kız", "erkek", "Erkek", "e", "ERKEK", "Man", "man"]
  };
  
  exports.help = {
    name: "kayıt"
  };