const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setTitle("**Fun**")
  .setAuthor(`${bot.user.tag}`, bot.user.displayAvatarURL)
    .setThumbnail(bot.user.displayAvatarURL)
 .addField("?lyrics","fun music mini games")
   .addField("?beautiful","tell someone his beautiful.")
  .addField("?slots", "Roll the slots!")
  .addField("?poke", "Poke a user.")
   .addField ("?8ball", "Ask the magical 8ball a question.")
   .addField("?get","Get a custom photo with your text ``Ex:`` ?get hi.")
  .addField("?joke", "Get a random joke.")
  .addField("?meme", "Get a random meme.")
  .addField("?cat", "Get random cat image.")
   .addField("?rip","Show your condolences for something (or everything).") 
  .addField("?dog", "Get a random dog image.")
  .addField("?avatar", "Get a member's avatar.")
  .addField("?8ball", "Ask the magical 8ball a question.")
  .addField("?roll", "Roll a number between 1-100")
  .addField("?vote","Make a nice vote for you where all your members can vote.")
  .addField("?poll","Make a nice poll for ya")
  .addField("?level", "What level are you on.")
  .addField("?quiz","Get a random question")
  .addField("?flip","Coinflip")
   .addField("?animememe","Provide anime memes") 
   .addField("?say","make the bot say the smae things")
   .addField("?number","pick a custom number")
  .setColor("RANDOM")
    .setFooter("if you want to suggest us something you can do it by doing s~suggest <sugge")
    .setTimestamp()
    message.channel.send(embed);
}
module.exports.help = {
    name: "s~fun"
}
