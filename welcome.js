const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
const app = express();
const prefix = "r!";
app.get("/", (request, response) => {
  console.log(Date.now() + " Succes connect the server!");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.on('guildMemberAdd', async (member, bot, message, args) => {
let onoff = await db.fetch(`WelcomeOnOff_${member.guild.id}`)
if(!onoff) return null;
let welch = await db.fetch(`Welcome_${member.guild.id}`)
if(!welch) return null
if(welch) {
  let ch = member.guild.channels.get(`${welch}`)
  ch.send(`Hello ${member} Welcome to server **${member.guild.name}** Discord Server 🐇!`)
}
})

client.on('guildMemberRemove', async (member, bot, message, args) => {
let onoff = await db.fetch(`WelcomeOnOff_${member.guild.id}`)
if(!onoff) return null;
let welch = await db.fetch(`Welcome_${member.guild.id}`)
if(!welch) return null
if(welch) {
  let ch = member.guild.channels.get(`${welch}`)
  ch.send(`**${member}** just left **${member.guild.name}** Discord server! Bye bye **${member.user.username}** 🐰!`)
}
})

client.on("messageDelete", message => {
  if (message.author.bot) return;
  const logsembed = message.guild.channels.find(
    channel => channel.name === "mod-log"
  );
  if (!logsembed) return;
  if (message.content.length > 2000) return;
  /*console.log(
    `\nDeleted Message: ${message.content} \nServer: ${message.guild.name} - ${message.guild.id} \nUser: ${message.author} \n`
  );*/

  const embed = new Discord.RichEmbed()
    .setTitle("Message Deleted")
    .addField("Message Author:", message.author)
    .addField("Froom Channel:", message.channel)
    .addField("Message Deleted", message.content)
    .setFooter("ID:" + message.id)
    .setColor("RED")
    .setTimestamp();
  logsembed.send(embed);
});

client.on('messageUpdate', (message, UpdatedMessage) => {
    if (message.author.bot) return;
    if (message.content === UpdatedMessage.content) return
    if (message.channel.type !== 'text') return;
    if (message.content > 1000) return;
    if (message.content <= 0) return;
    if (UpdatedMessage.content >= 1000) return;
    if (UpdatedMessage.content <= 0) return;
    let guild = message.guild;
    let modlog = guild.channels.find('name', "mod-log");
    if (!modlog) return;
    const embed = new Discord.RichEmbed()
        .setColor("BLUE")
        .setTitle("Message Edited")
        .addField("Message Author:", message.author)
        .addField("From Channel:", message.channel)
        .addField("Before Edit: ", message.content)
        .addField("After Edit: ", UpdatedMessage.content)
        .setFooter("ID:" + message.id)
    	.setTimestamp();
    client.channels.get(modlog.id).send({
        embed
    });
});

client.on("roleDelete", role => {
  const logsembed = role.guild.channels.find(
    channel => channel.name === "mod-log"
  );
  if (!logsembed) return;

  const embed = new Discord.RichEmbed()
    .setAuthor(role.guild.name, role.guild.iconURL)
    .setDescription(`**Deleted Role:** \`\`${role.name}\`\``)
    .setFooter("ID:" + role.id)
    .setColor("#fd7d3a")
    .setTimestamp();
  logsembed.send(embed);
});

client.on("roleCreate", role => {
  const logsembed = role.guild.channels.find(
    channel => channel.name === "mod-log"
  );
  if (!logsembed) return;

  const embed = new Discord.RichEmbed()
    .setAuthor(role.guild.name, role.guild.iconURL)
    .setDescription(`**Created Role:** \`\`${role.name}\`\``)
    .setFooter("ID:" + role.id)
    .setColor("#fd7d3a")
    .setTimestamp();
    logsembed.send(embed);
});

client.on("channelDelete", channel => {
  const logsembed = channel.guild.channels.find(
    channel => channel.name === "mod-log"
    );
  
   if (!logsembed) return;
  
  const embed = new Discord.RichEmbed()
  .setAuthor("Channel Deleted", client.user.displayAvatarURL)
  //.addField("Deleted Author", message.author)
  .addField("Channel Name", "#" + channel.name)
  .addField("ID", channel.id)
  .setColor("RED")
  .setTimestamp();
  logsembed.send(embed);
});

client.on("channelCreate", channel => {
  const logsembed = channel.guild.channels.find(
    channel => channel.name === "mod-log"
    );
  
  if (!logsembed) return;
  
  const embed = new Discord.RichEmbed()
  .setAuthor("Channel Created", client.user.displayAvatarURL)
  .addField("Channel Name", "#" + channel.name)
  .addField("ID", channel.id)
  .setColor("BLUE")
  .setTimestamp();
  logsembed.send(embed);
});
    
client.on("channelUpdate", (message, oldChannel, newChannel) => {
  const logsembed = message.guild.channels.find(
    channel => channel.name === "mod-log"
    );
  
  if (!logsembed) return;
  
  const embed = new Discord.RichEmbed()
  .setAuthor("Channel Update", client.user.displayAvatarURL)
  .addField("Before", "#" + oldChannel.name)
  .addField("After", "#" + newChannel.name)
  //.addField("ID", oldChannel.id + newChannel.id)
  .setColor("GREEN")
  .setTimestamp();
  logsembed.send(embed);
});
  
client.on("guildCreate", (guild) => { //new guild
    let owner = client.users.get('577323427434594313');
    owner.send(`> **Name:** ${guild.name}\`\`\n` +
        `> **Members:** \`\`${guild.memberCount}\`\`\n` +
        `> **Owner:** \`\`${guild.owner}\`\``);
});
/** Bot guildDelete event */
client.on("guildDelete", (guild) => { //guild left
    let owner = client.users.get('577323427434594313');
    owner.send(`> **Name:** \`\`${guild.name}\`\`\n` +
        `> **Members:** \`\`${guild.memberCount}\`\`\n` +
        `> **Owner:** \`\`${guild.owner.name}\`\``);
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.guild === null) return;
  if (message.content.startsWith(prefix + "afk")) {
    const time = message.createdAt.toLocaleString();
    const isAFK = new Set();
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
    if (isAFK.has(message.author.id + message.guild.id))
      return message.reply("You are already AFK!");

    let reason = args.join(" ") || "AFK";

    isAFK.add(message.author.id + message.guild.id);
    message.reply(`You are now AFK for the reason of: \`${reason}\``);
    
    //message.reply(`you are now AFK for the reason of: \`${reason}\``);

    const filter = m =>
      (m.mentions.users.has(message.author.id) ||
        m.author.id === message.author.id) &&
      !m.author.bot;
    const collector = message.channel.createMessageCollector(filter);

    collector.on("collect", msg => {
      if (msg.author.id === message.author.id) {
        collector.stop();
        isAFK.delete(message.author.id + message.guild.id);
        return message.channel.send(
          ` <:hype:658764093544726529> ${message.author}, welcome back! <:hype:658764093544726529> `
        );
      } else {
        return message.channel.send(
          ` <a:DND:633486261302329365> This user is currently AFK for: \`${reason}\`. <a:DND:633486261302329365> \n \n Time Alasped: **${time}**`
        );
      }
    });
  }
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content) return;
  if (message.guild === null) return;
  if (message.content.startsWith(prefix + "gcreate")) {
    let perms = message.member.hasPermission("MANAGE_GUILD");
    if (!perms)
      message.reply(
        " <a:NOOO:604048270792196224> you don't have ``manage servers`` perms!"
      );
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
    message.delete(10);
    
    const winnerCount = parseInt(args[0]);
    const time = parseInt(args[1]);
    const item = args.slice(2).join(" ");

    // Check if the user has entered valid information
    if (!winnerCount)
      return message.channel.send("> Please enter a number of winners.");
    if (!time)
      return message.channel.send(
        "> Please enter a number for the time. (Entering 1 will be 1 hour, so entering 2 is 2 hours and so on)"
      );
    if (!item)
      return message.channel.send("> Please enter an item for Giveaway.");

    const giveawayMessage = await message.channel.send(
      `<a:celebrate:638436394062315546> **GIVEAWAY STARTED** <a:celebrate:638436394062315546> \n > Giveaway Item: **${item}** \n > Enter by **reacting** to 🎉 on this message. \n > \n > Giveaway will last for **${time} hour(s)**! \n > Giveaway Author: **${message.author.username}**`
    );

    giveawayMessage.react("🎉");

    // let's wait till the end of the giveaway
    // Define the winners
    setTimeout(() => {
      const winners = giveawayMessage.reactions // These are all the reactions on the giveaway message
        .get("🎉") // This the just the 🎉 MessageReaction
        .users // These are all the users that reacted with 🎉
        .filter(u => !u.bot) // We don't want bots to participate
        .random(winnerCount) // Get winnerCount amount of random users from that list
        .join(", "); // Mention all the users, seperated by a comma

      // Send the winners in the channel
      if (!winners)
        return message.channel.send(
          `> <a:NOOO:604048270792196224> There weren't any winners for: **${item}** giveaway! :(`
        );
      message.channel.send(
        `<a:celebrate:638436394062315546> **GIVEAWAY ENDED** <a:celebrate:638436394062315546> \n > Winners: ${winners} \n > Won: **${item}** giveaway!`
      );
    }, time * 3600000); // Time entered by the user is in seconds, setTimeout expects miliseconds
  }
});

/*client.on("messageDelete", message => {
  if (message.author.bot) return;
  const logsembed = message.guild.channels.find(
    channel => channel.name === "meme-and-media"
  );
  if (!logsembed) return;
  if (message.content.length > 2000) return;
  console.log(
    `\nDeleted Message: ${message.content} \nServer: ${message.guild.name} - ${message.guild.id} \nUser: ${message.author} \n`
  );

  const embed = new Discord.RichEmbed()
    .setAuthor(
      message.author.username + "#" + message.author.discriminator,
      message.author.avatarURL
    )
    .setDescription(
      `**Deleted message:** \n ${message.content} \n \n **Channel:** \n ${message.channel}`
    )
    .setFooter("ID:" + message.author.id)
    .setColor("#fd7d3a")
    .setTimestamp();
  logsembed.send(embed);
});*/

client.on('serverNewMember', function(server, user) {
	client.sendMessage(server, "A new member has arrived. Welcome, " + user.username + " to " + server.name + ". Type r!help for commands.");
});

client.login(process.env.TOKEN);
