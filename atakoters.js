// KUMPULAN CONST
const Discord = require("discord.js");
const { Client, Util, RichEmbed, MessageEmbed, Collection } = require('discord.js');
const http = require('http');
const express = require('express');
const app = express();
const fs = require('fs');
const db = require('quick.db');
const leveling = require('./atakoters.js');
const { Canvas } = require("canvas-constructor")
const { loadImage } = require("canvas")
const config = require("./config.json");
//const coins = require("./coins.json");
//const xp = require("./xp.json");
const YouTube = require("simple-youtube-api");// eh bentar MessageEmbed buat apa? bentar w kasih // jgn deh ada ide ntar gw, :v
const ytdl = require("ytdl-core");
const snekfetch = require('snekfetch');
const cooldown = new Collection();
//const money = require('discord-money'); 
const client = new Client({
    disableEvents: [
],
  disableEveryone: true,
  fetchAllMember: false
})

const func = require("./functions.js"); // If this returns an error for you (or you migh be on ubuntu/linux), try '../functions.js'
// You can also change the name of func to something else like tools

client.memory = new db.table("craftmodlog")
client.welcome = new db.table("craftyjl")
client.something = new db.table("economycmd")
client.daily = new db.table("dailytime")
client.xp = new db.table("explist")
client.afk = new db.table("craftafk")
client.px = new db.table("craftpx")
client.inv = new db.table("craftvend")
client.role = new db.table("craftrole")

const queue = new Collection();
client.queue = queue;

//client.snek = require('node-superfetch')
client.commands = fs.readdirSync('./commands');
client.aliases = {};

const youtube = new YouTube(process.env.YOUTUBE);
// selesai di sini kumpulannya :v ntar kita mau buat command apa yah hmmm?????
// coba cari resource nya di Glitch
//

for(const cmd of client.commands){
const file = require(`./commands/${cmd}`);
if(!file.conf || !file.conf.aliases) continue;
if(file.conf.aliases instanceof Array){
for(const al of file.conf.aliases){
client.aliases[al] = cmd;
    }
  }else{
client.aliases[file.conf.aliases] = cmd;
}
}

for(const cmd of client.commands){
const file = require(`./commands/${cmd}`);
if(!file.conf || !file.conf.aliases) continue;
  
}

require("./server.js");


function random_playing() {
  let status = [`at!help | anyone i can help you!`, `Atako Lovers :) | ${client.users.size} freinds!`,  `Entertaiment with Atako | ${client.guilds.size} Guild Lovers!`] // You cant set anything playing you want it!
  let random = status[Math.floor(Math.random() * status.length)]
  client.user.setActivity(random, {type: "PLAYING", url: 'https://youtube.ocm', status: 'dnd'}); // thx yaa dah di bikinin
}

client.on('ready', () => {
  var clientlog = `Bot started with ${client.users.size} users ${client.guilds.size} guilds ${client.channels.size} channels!`
  
  console.log(clientlog);
  setInterval(random_playing, 10000);
});

client.on('guildMemberAdd', async (member, bot, message, args) => {
let onoff = await db.fetch(`WelcomeOnOff_${member.guild.id}`)
if(!onoff) return null;
let welch = await db.fetch(`Welcome_${member.guild.id}`)
if(!welch) return null
if(welch) {
  let ch = member.guild.channels.get(`${welch}`)
  ch.send(`Hello ${member} Welcome to server **${member.guild.name}** Discord Server!\n**Don't forget to read the server rules so that they don't get penalized, and hopefully enjoy it!**`)
}
})

client.on('guildMemberRemove', async (member, bot, message, args) => {
let onoff = await db.fetch(`WelcomeOnOff_${member.guild.id}`)
if(!onoff) return null;
let welch = await db.fetch(`Welcome_${member.guild.id}`)
if(!welch) return null
if(welch) {
  let ch = member.guild.channels.get(`${welch}`)
  ch.send(`**${member}** just left ${member.guild.name} Discord server! Bye bye **${member.user.username}!**`)
}
})


  
client.on('message', async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;
  
  let crafty = JSON.parse(fs.readFileSync("./crafty.json", "utf8"));
  if(!crafty[msg.guild.id]){ 
     crafty[msg.guild.id] = {
       prefix: config.prefix
     }
  }


//End of code Prefix Command
  if (msg == `<@${client.user.id}>` || msg == `<@!${client.user.id}>`) {
    let tagEmbed = new Discord.RichEmbed()
    .setThumbnail(client.user.displayAvatarURL) // ok!
    .setColor('RANDOM')
    .setTitle(`${client.user.username} Prefix`)
    .setDescription(`Global Prefix =  (**m~>**) \nPrefix in this Server =  (**${crafty[msg.guild.id].prefix}**)`);
    msg.channel.send(tagEmbed);
}
  
  
//End of code Mention Bot  
  let prefix = crafty[msg.guild.id].prefix;
  if (!msg.content.startsWith(prefix)) return;
  const messageArray = msg.content.split(" ");
  const args = msg.content.slice(prefix.length).trim().split(' ');
  const searchString = messageArray.slice(1).join(' ');
  const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
  console.log(searchString);
  const serverQueue = queue.get(msg.guild.id);
  let sender = msg.author;
  let cmd = args.shift().toLowerCase();
  msg.member.voiceChannel === msg.member.voice;
// Variables ^^^^^^^^

  try {
      if(client.aliases[cmd]){
				delete require.cache[require.resolve(`./commands/${client.aliases[cmd]}`)];
        require(`./commands/${client.aliases[cmd]}`).run(client, msg, args);

      }else{

    delete require.cache[require.resolve(`./commands/${cmd}.js`)];

		let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, msg, args, func);


      }

  } catch (e) {
    console.log(e.stack)                                                                  
  } finally {
   console.log(`${msg.author.tag} used ${cmd} in guild ${msg.guild.name} (${msg.guild.id})`)
}

//End of code CMD Handler
  
  
// Music Command
// ============================================================================================================================================
});
exports.handleVideo = handleVideo;
exports.queue = queue;

async function handleVideo(video, message, voiceChannel, playlist = false) {
	const serverQueue = queue.get(message.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
    uploaded: video.channel.title,
    authors: message.author,
    create: (video.publishedAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    voicechan: message.member.voiceChannel.name,
    durationmm: video.durationSeconds ? video.durationSeconds : video.duration / 1000,
    channel: `https://www.youtube.com/channel/${video.channel.id}`,
		url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    duration: video.duration
	};
	if (!serverQueue) {
		const queueConstruct = {
      user: message.author,
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 100,
			playing: true
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);
    
		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(message.guild.id);
			return message.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;

    var addedembed = new RichEmbed()
    .setColor('GREEN')
    .setAuthor(`🎶 Added Queue:`)
    .setDescription(`**:white_check_mark: ${song.title}** has been successfully added to music channels!`)
    .setTimestamp();
    
		return message.channel.send(addedembed);
	}
	return undefined;
}

function play(guild, song, message) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
  
  var playembed = new RichEmbed()
  .setColor('BLACK')
  .setAuthor(`🎶 Start Playing:`)
  .setDescription(`**:white_check_mark: ${song.title}** has been successfully added to music channels!`)
  .setTimestamp();
  
	serverQueue.textChannel.send(playembed);
}
// ============================================================================================================================================

client.login(process.env.TOKEN); // wtf dia gk ready liat di logs