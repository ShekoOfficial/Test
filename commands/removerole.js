const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(args[0] == "help"){
    let helpembxd = new Discord.RichEmbed()
    .setColor("#00ff00")
    .addField("Removerole Command", "Usage: uwu!removerole <@user> <@role>")

    message.channel.send(helpembxd);
    return;
  } 

  let xdemb = new Discord.RichEmbed()
  .setColor("#00ff00")
  .setTitle(`Removerole command`)
  .addField("Description:", "Take role from member", true)
  .addField("Usage", "uwu!removerole [user] [role]", true)
  .addField("Example", "uwu!removerole @Uwu @Member")

  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You need the `manage members`premission to do that!.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.channel.send(xdemb);

  let role = args.join(" ").slice(22);

  if(!role) return message.reply("Specify/Mentions a role!");
  let gRole = message.mentions.roles.first();
  if(!gRole) return message.reply("Couldn't find that role.");

  if(!rMember.roles.has(gRole.id)) return message.reply("This user doesn't have that role.");
  await(rMember.removeRole(gRole.id));

  await message.channel.send(`***I just removed ${rMember.user.username}'s ${gRole} role!***`)

  message.delete();

}

module.exports.help = {
  name: "removerole"
}