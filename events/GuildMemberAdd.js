const config = require("../config.js")
client.on("guildMemberAdd", async member => {
    if(member.user.bot) return;
    member.guild.channels.cache.get("1223981799626248215").send(`${member} emdocs test sunucumuza hoş geldin seninle birlikte sunucumuz ${member.guild.memberCount} kişi oldu!
  
    Kayıt olmak için Ses Kanallarından Birine Girip  İsim Yaş Verip kayıt olabilirsin
  
    Şimdiden iyi eğlenceler kuralları okumayı unutma! `)

    });