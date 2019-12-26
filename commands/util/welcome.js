const db = require('quick.db')
const Discord = require('discord.js')

module.exports.run = async (bot, msg, args) => {
  let option = args.slice(0).join(' ');
if (!msg.member.hasPermission("ADMINISTRATOR")  & msg.author.id !== "291221132256870400") return msg.reply("Sorry, you don't have permissions `ADMINISTRATOR` to use this!");
  let embed = new Discord.RichEmbed()
    .setTitle("Rabbit's - Welcome")
    .setDescription("Set welcome message member joined and leave discord server.")
    .addField(`➣ Welcome`, 'Enabled')
    .addField(`➣ Welcome`, 'Disabled')
    .addField(`➣ Welcome`, 'Set Channel')
    .addField(`➣ Example`, 'r!welcome set channel #welcome')
    .setColor("#faa8a2")
    .setThumbnail(bot.user.displayAvatarURL)
    msg.channel.send({embed: embed});msg.delete();

  
  if(option.match("enabled")) {
  await db.set(`WelcomeOnOff_${msg.guild.id}`, msg.guild.id)
  msg.reply('Welcome has been **Enabled**')
  }
  
  if(option.match("disabled")) {
  await db.delete(`WelcomeOnOff_${msg.guild.id}`)
  msg.reply('Welcome has been **Disabled**')
  }
  
  if(option.match("set channel")) { 
  let channel = msg.mentions.channels.first();
  if(!channel) return msg.reply('Mention channel if you using commands!')
  await db.set(`Welcome_${msg.guild.id}`, false)
  await db.set(`Welcome_${msg.guild.id}`, channel.id)
  msg.reply(`Welcome channel success set!`)
  }
}

module.exports.conf = {
  aliases: ["welcome"],
  clientPerm: "",
  authorPerm: ""
};

module.exports.help = {
  name: "welcome",
  description: "Play songs on youtube",
  usage: "play <url | query | playlist>",
  example: ["play oreno wasuremono", "play https://m.youtube.com/watch?v=UERDkJ5jMjs", "play http://www.youtube.com/playlist?list=PLxC_BSkebVLy4MbwKtpGSq0qv2ivZWl22"]
};