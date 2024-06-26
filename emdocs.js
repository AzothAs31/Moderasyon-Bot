const { Client, GatewayIntentBits, Partials } = require("discord.js");
const Discord = require("discord.js")
const db = require("croxydb")
const config = require("./config.js");
const client = new Client({
  partials: [
    Partials.Message, 
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent, 
    Partials.User, 
    Partials.ThreadMember, 
  ],
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations, 
    GatewayIntentBits.GuildWebhooks, 
    GatewayIntentBits.GuildInvites, 
    GatewayIntentBits.GuildVoiceStates, 
    GatewayIntentBits.GuildPresences, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping, 
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions, 
    GatewayIntentBits.DirectMessageTyping, 
    GatewayIntentBits.MessageContent, 
  ],
});

module.exports = client;



require("./events/message.js")

require("./events/ready.js")



client.login(config.Token)

client.on("guildMemberAdd", async member => {
  if(member.user.bot) return;
  member.guild.channels.cache.get("1218842768802054225").send(`${member}  ${guildname} sunucumuza hoş geldin seninle birlikte sunucumuz ${member.guild.memberCount} kişi oldu!

  Kayıt olmak için Ses Kanallarından Birine Girip İsim Yaş Verip kayıt olabilirsin

  Şimdiden iyi eğlenceler kuralları okumayı unutma!`)
  
  });
  