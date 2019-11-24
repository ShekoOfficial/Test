const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.RichEmbed()
  
  .setTitle("List of Commands.")
  .setDescription("__Sheko Help List!__")
  .setColor("RANDOM")
  .setAuthor(`Help List Sheko`, "https://images-ext-2.discordapp.net/external/GdjB4CeLIR5fXW5pTh8gfBZAshRK4XytrljlmvltYrs/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/577757256389492736/f0d0aa9589b2138ef1102c29d8ddb16e.png?width=616&height=616")
  .setThumbnail("https://images-ext-2.discordapp.net/external/GdjB4CeLIR5fXW5pTh8gfBZAshRK4XytrljlmvltYrs/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/577757256389492736/f0d0aa9589b2138ef1102c29d8ddb16e.png?width=616&height=616")
  .addField ("s~welcome","**__set up your welcome message channel.__**")
  .addField("s~main","**display all the __main__ commands** \n 25 cmds available.", false)
  .addField("s~mod","**display all __mods__ commands** \n 9 cmds available.", false)
  .addField("s~fun", "**display all __fun__ commands** \n 19 cmds available.", false)
  .addField("s~time","**display all the __time__ commands** \n 3 cmds available.")
  .addField("s~radio","**display all the __radio__ commands** \n 7 cmds available.")
  .addField("s~game","**display the __game__ commands** \n 8 cmds available.",false)
  .addField("s~music","**display all the __music__ commands** \n 9 cmds available.",false)
 .addField("s~nsfw","**display all the __nsfw__ commands** \n 23 cmds available.",false)
  .addField("s~dev","**display all the __developer__ commands** \n 4 cmds available.")
    .addField("s~giveaway","**display all the __giveaways__ commands** \n 7 cmds available.")
  .addField("s~statistics", "**display all the __statistics__ commands** \n 16 cmds available.", false)
  .addField("s~ticket","**display all the __ticket__ commands** \n 3 cmds available.")
    .addField("s~soundboard (IN WORK)","**display all the __soundboard__ command** \n 15 cmds available.")
        .addField("s~hd","**HD music player** \n 10 cmds available.")
  .addField("Support","| [Support Server](https://discord.gg/kcSv2yq) | [Vote](Comingsoon) | [Invite me to your Server](https://discordapp.com/oauth2/authorize?client_id=577757256389492736&scope=bot&permissions=2146958591) |")
  .addField("bad words filter on ❌","This will remove all bad word.",false)
  .setFooter("If you found a bug please report it using s~bugreport", "https://images-ext-2.discordapp.net/external/GdjB4CeLIR5fXW5pTh8gfBZAshRK4XytrljlmvltYrs/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/577757256389492736/f0d0aa9589b2138ef1102c29d8ddb16e.png?width=616&height=616")
  

  message.channel.send(embed).then(message => message.react('✔'))

}
module.exports.help = {
  name: "s~help"
}
