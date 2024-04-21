const Discord = require("discord.js");
const conf = require("../Global/configs/sunucuayar.json");


  exports.run = async(client, message, args) => {
    message.channel.send({
      content: `<a:jail:1229119486590713917> Aşağıda ki düğmelerden ceza listenizi, ceza puanını ve aktif cezanızın kalan süresini görüntüleyebilirsiniz.\n@here @everyone`,
      components: [{
        type: 1,
        components: [
          { type: 2, style: 2, custom_id: "cezapuan", label: "Ceza Puanı", emoji: { id: "924625730682384404" } },
          { type: 2, style: 3, custom_id: "cezalarım", label: "Cezalarım", emoji: { id: "924625730682384404" } },
          { type: 2, style: 4, custom_id: "kalanzaman", label: "Kalan Zamanım?", emoji: { id: "924625730682384404" } }
        ]
      }]
    })
  };
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["cezabutton"]
  }
  exports.help = {
      name: "cezabutton"
  }

