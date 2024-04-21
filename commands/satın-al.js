const Discord = require('discord.js')
const slenzydb = require('croxydb');


exports.run = async (client, message, args) => {
  
  if (!args[0]) return message.reply(`Lütfen bir ürün gir!`)
  
  if (args[0] === 'cips') {
    let para = await slenzydb.get(`para_${message.author.id}`) 
    let cipsfiyati = 15
    
    if (para < cipsfiyati) return message.reply('Yeterli Paran Yok!')
    
    slenzydb.add(`para_${message.author.id}`, -cipsfiyati)
    
    return message.reply(`Başarıyla Cips Aldın!`)
  }
  if (args[0] === 'Bilgisayar') {
    let para = await slenzydb.get(`para_${message.author.id}`) 
    let fiyat = 14500
    
    if (para < fiyat) return message.reply('Yeterli Paran Yok!')
    
    slenzydb.add(`para_${message.author.id}`, -fiyat)
    
    return message.reply(`Başarıyla Bilgisayar Aldın!`)
  }

  if (args[0] === 'Hamburger') {
    let para = await slenzydb.get(`para_${message.author.id}`) 
    let fiyat = 95
    
    if (para < fiyat) return message.reply('Yeterli Paran Yok!')
    
    slenzydb.add(`para_${message.author.id}`, -fiyat)
    
    return message.reply(`Başarıyla Hamburger Aldın!`)
  }
  if (args[0] === 'İsrail Malı Coca Cola') {
    let para = await slenzydb.get(`para_${message.author.id}`) 
    let fiyat = 20
    
    if (para < fiyat) return message.reply('Yeterli Paran Yok!')
    
    slenzydb.add(`para_${message.author.id}`, -fiyat)
    
    return message.reply(`Başarıyla İsrail Cola Cola Aldın!`)
  }

  if (args[0] === 'Mülteci') {
    let para = await slenzydb.get(`para_${message.author.id}`) 
    let fiyat = 1
    
    if (para < fiyat) return message.reply('Yeterli Paran Yok Mülteci Bile alamıyon fakir!')
    
    slenzydb.add(`para_${message.author.id}`, -fiyat)
    
    return message.reply(`Başarıyla Mülteci Aldın ZENCİ SJFSDFUHSDIUFDSMNF`)
  }
}
exports.conf = {
  
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'satın-al'
}