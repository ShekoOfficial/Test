// Walcomer Bot 1.0 - Created by Dob6458 and ChocolateAwn
const express = require("express");
const app = express();
const invites = {};
const wait = require('util').promisify(setTimeout);

const http = require("http");

const Discord = require("discord.js");
const client = new Discord.Client();

const Canvas = require("canvas");

const port = 3000;

client.on("ready", () => {
  console.log(`Logged in as: ${client.user.tag}`);
})

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 50;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
	if (!channel) return;

	const canvas = Canvas.createCanvas(650, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/630391387195703296/643710979473145856/Kuzu-no-Honkai-03-34.jpg");
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#ffffff';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server!', canvas.width / 2.5, canvas.height / 3.5);
  
  ctx.font = applyText(canvas, member.displayName);
	ctx.fillStyle = '#ffffff';
	ctx.fillText([member.displayName], canvas.width / 2.5, canvas.height / 1.8);
  
	// Select the font size and type from one of the natively available fonts
//	ctx.font = '60px sans-serif';
	// Select the style that will be used to fill the text in
	//ctx.fillStyle = '#ffffff';
	// Actually fill the text with a solid cmolor
	//ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image-member.png');

	channel.send(`> Hello ${member} Welcome to **${member.guild.name}!** Discord Server! 🎉`, attachment);
});

/*client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.find(ch => ch.name === 'welcome');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://images.app.goo.gl/GvqY1PVAiPCtVhh79.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);
});*/

client.on("guildMemberRemove", async (member) => {
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
	if (!channel) return;

	const canvas = Canvas.createCanvas(650, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/630391387195703296/643710979473145856/Kuzu-no-Honkai-03-34.jpg");
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#ffffff';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Goodbyee the server!', canvas.width / 2.5, canvas.height / 3.5);
  
  ctx.font = applyText(canvas, member.displayName);
	ctx.fillStyle = '#ffffff';
	ctx.fillText([member.displayName], canvas.width / 2.5, canvas.height / 1.8);
  
	// Select the font size and type from one of the natively available fonts
//	ctx.font = '60px sans-serif';
	// Select the style that will be used to fill the text in
	//ctx.fillStyle = '#ffffff';
	// Actually fill the text with a solid cmolor
	//ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image-member.png');

	channel.send(`> ${member.user.username} just left **${member.guild.name}!** Discord Server! Bye bye **${member.user.username}**! 🎈`, attachment);
});
    
client.login(process.env.TOKEN)
