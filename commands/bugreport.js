const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let bug = args.join(" ").slice(0);
    if (!bug) return message.channel.send({
        embed: {
            description: `Please, enter your report!\n**EXAMPLE: ${message.prefix}bugreport music bot lagging!**`
        }
    })
    let user = message.author.username;
    let guild = message.guild.name;
    let channel = client.channels.get("629981023924518920")
    let embed = new Discord.RichEmbed()
    .setTitle("Bug Report")
    .setThumbnail("https://cdn.discordapp.com/avatars/577757256389492736/f0d0aa9589b2138ef1102c29d8ddb16e.png?size=2048")
    .addField("Bug", bug)
    .addField("Reported By", user)
    .addField("Reported in", guild)
    .setColor("RANDOM")
    .setFooter("All rights reserved ©ChoirilOfficial Development in 2019")
    .setTimestamp()
    message.channel.send({
        embed: {
            description: `<:white_check_mark:432418492889694210> **| Your bug has been reported in the official server. It will be reviewed so please be patient.**`
        }
    })
    channel.send(embed).then(i => i.react("⏳"))
}