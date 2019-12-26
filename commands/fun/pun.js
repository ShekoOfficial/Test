module.exports.run = async (client, msg) => {
  try {
    const { body } = await client.snek.get("https://icanhazdadjoke.com/")
      .set("Accept", "application/json");
    return msg.channel.send(`📢 \`|\` **${body.joke.length ? body.joke : "Try again"}**`);
  } catch (e) {
    return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
  }
};

module.exports.conf = {
  aliases: [],
  clientPerm: "",
  authorPerm: ""
};

module.exports.help = {
  name: "pun",
  description: "Generates a random pun.",
  usage: "pun",
  example: ["pun"]
};
