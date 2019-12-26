const { RichEmbed } = require("discord.js");
const linter = new (require("eslint").Linter)();
const rules = linter.getRules();

module.exports.run = async (client, msg, args) => {
  if (args.length < 1) return args.missing(msg, "no rule provided", this.help);
  try {
    if (!rules.has(args[0])) return msg.channel.send("🚫 Could not find any results.");
    const data = rules.get(args[0]).meta;
    const embed = new RichEmbed()
      .setAuthor("ESLint", "https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/358/full/eslintlogo.png", "https://eslint.org/")
      .setColor("#3A33D1")
      .setTitle(`${args[0]} (${data.docs.category})`)
      .setURL(`https://eslint.org/docs/rules/${args[0]}`)
      .setDescription(data.docs.description);
    return msg.channel.send(embed);
  } catch (e) {
    return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
  }
};

module.exports.conf = {
  aliases: ["lint-rule", "esrule"],
  clientPerm: "EMBED_LINKS",
  authorPerm: ""
};

module.exports.help = {
  name: "eslint-rule",
  description: "Gets information on an eslint rule.",
  usage: "eslint-rule <rule>",
  example: ["eslint-rule for-direction"]
};
