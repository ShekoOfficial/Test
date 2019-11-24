const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let embed = new Discord.RichEmbed()
  .setTitle("Moderation")
  .setURL('https://discord.gg/kcSv2yq')
  .setAuthor(`${bot.user.tag}`, bot.user.displayAvatarURL)
  .setColor("RANDOM")
.setThumbnail("https://images-ext-2.discordapp.net/external/GdjB4CeLIR5fXW5pTh8gfBZAshRK4XytrljlmvltYrs/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/577757256389492736/f0d0aa9589b2138ef1102c29d8ddb16e.png?width=616&height=616")
  .addField("?ban","Ban a member.", false)
  .addField("?clear","Clear messages",false)
  .addField("?warn","Warn a member.",false)
  .addField("?mute","mute a member.",false)
.addField("?lockdown","This will lock a channel down for the set duration, be it in hours, minutes or seconds.")
  .addField("?kick","message.auth",false)
  .addField("?purge", "Clears a member's messages.",false)
  .addField("?unmute", "Unmute a member.",false)
.addField("?sayd","same as say and it will remove your message [administration need]")
  .setFooter("Require mod-log channel.")
  message.author.send({embed});
  message.reply ("l just send you all the **__mod__** commands in your DMs 📥")
}

module.exports.help = {
  name: "?mod"
}