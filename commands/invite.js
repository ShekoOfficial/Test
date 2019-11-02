exports.run = (client, message, args, sql, Discord) => {
var embed = new Discord.RichEmbed()
    .setTitle("Uwu Bot")
    .setDescription("Thank you for choosing UwuBot! We are still in production so please report any bugs. [Click Here](https://discordapp.com/oauth2/authorize?client_id=636846696650899494&scope=bot&permissions=2146958591) to add to your server.")
    .setColor("#faa8a2")
    .setThumbnail(client.user.displayAvatarURL)
    message.channel.send({embed: embed});
}