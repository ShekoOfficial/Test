const Discord = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports.run = async (client, message, args) => {
  if(message.author.bot) return;
  if(message.channel.type !== "text") return;
  randomPuppy('animemes')
  .then(url => {
    const embed = new Discord.RichEmbed()
    .setTimestamp(new Date())
    .setTitle(`Anime Meme`)
    .setImage(url)
    .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : 0xffffff}`)
    return message.channel.send({ embed });
  })
}