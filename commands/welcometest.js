const { Canvas } = require("canvas-constructor");
const { resolve, join } = require("path");
const { Attachment } = require("discord.js");
const { get } = require("snekfetch"); 
const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args) => {
let tes = args.slice(0).join(' ');
if (!tes) return null;
  if (tes.match('test')) {
  var nama = message.author.username
var jadi = nama.length > 12 ? nama.substring(0, 10) + "..." : nama;
async function createCanvas() {
var imageUrlRegex = /\?size=2048$/g;
var {body: background} = await superagent.get("https://cdn.discordapp.com/attachments/630391387195703296/636195360762495006/images.png");
var {body: avatar} = await superagent.get(message.author.displayAvatarURL.replace(imageUrlRegex, "?size=128"));
var {body: botavatar} = await superagent.get("https://media.discordapp.net/attachments/574815867586478080/579521499686502413/anime-romance-school-5.jpg");
let welcomeCB = new Canvas(800, 360)
 .addImage(avatar, 50, 50, 100, 100, 128)
 .setColor("RANDOM")
 .setTextFont('26px Impact')
 .setTextAlign('center')
 .setTextFont('30px Oswald')
 .addImage(background, 0, 0, 0, 0)
 .addImage(botavatar, 0, 0, 856, 376)
 .addText("Welcome Back", 625, 105)
 .addText(`${jadi}#${message.author.discriminator}`, 625, 145)
 .addRoundImage(avatar, 135, 10, 256, 256, 128)
 .toBufferAsync();