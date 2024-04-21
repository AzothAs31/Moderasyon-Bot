
const client = require("../emdocs.js");
const { Collection } = require("discord.js")
const fs = require("fs")
const config = require("../config.js")
client.on("ready", () => {

client.user.setActivity(config.BotDurum)
client.user.setStatus(config.DurumTipi)
client.commands = new Collection();
client.aliases = new Collection();

fs.readdir("./commands/", (err, files) => {
if (err) console.error(err);
console.log(`[mssix-KOMUT] ${files.length} adet komut yükleme işlemine koyuldu.`);
files.forEach(f => {
let props = require(`../commands/${f}`);
    
console.log(`[mssix-KOMUT] ${props.help.name} isimli komut yüklendi.`);

    
client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {
client.aliases.set(alias, props.help.name);
console.log(`[mssix-BOT] ${client.user.tag} ismiyle Discord APİ bağlantısı kuruldu!`)
});
});
});

});

const { joinVoiceChannel } = require('@discordjs/voice')
client.on('ready', () => {
  let channel = client.channels.cache.get(config.SesID)
 

      const VoiceConnection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator
  });
}) 