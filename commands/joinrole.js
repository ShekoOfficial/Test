const fs = require("fs");

exports.run = async (client, message, args, queue, color) => {
	if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Sorry you can not use this command!");
	let autorole = JSON.parse(fs.readFileSync("./joinrole.json", "utf8"));
	if (!args[0]) {
		autorole[message.guild.id] = {
			role: 0
		};
		fs.writeFile("./joinrole.json", JSON.stringify(autorole), (err) => {
			if (err) console.log(err);
		});
		message.channel.send(`**${message.author}** autorole is turned off!`);
	}
	if (args[0]) {
		let roles = args.join(" ");
		let role = message.guild.roles.find("name", roles);
		autorole[message.guild.id] = {
			role: role.id
		};
		fs.writeFile("./joinrole.json", JSON.stringify(autorole), (err) => {
			if (err) console.log(err)
		});
		message.channel.send(`**${message.author}** autorole is set to **${role.name}**`);
	}
}