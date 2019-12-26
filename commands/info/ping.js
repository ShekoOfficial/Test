const { RichEmbed } = require("discord.js");

module.exports.run = async (client, msg) => {
  try {
    const m = await msg.channel.send("Ping...");
    const embed = new RichEmbed()
      .setColor("RANDOM")
      .addField("⏳ Latency", `__**${m.createdTimestamp - msg.createdTimestamp}ms**__`)
      .addField("💓 API", `__**${Math.floor(client.ping)}ms**__`);
    return m.edit(`🏓 P${"o".repeat(Math.floor(client.ping) % 5 === 0 ? 0 : Math.floor(Math.random() * 5))}ng..`, { embed: embed });
  } catch (e) {
    return msg.channel.send(`Oh no an error occured :( ${e.message} try again later`);
  }
};

module.exports.conf = {
  aliases: ["ping"],
  clientPerm: [],
  authorPerm: ""
};

module.exports.help = {
  name: "ping",
  description: "Ping pong with the bot",
  usage: "ping",
  example: ["ping"]
};
