const { RichEmbed } = require('discord.js');
const { GOOGLE_KEY } = process.env;
const Discord = require('discord.js')
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

module.exports.run = async (client, msg, args) => {
	if(!args.length) return msg.channel.send(exports.help.usage, { code: 'asalWehCodemah' });
	try{
		if(!GOOGLE_KEY) throw TypeError('NO GOOGLE KEY IN ENV >:(');
		const youtube = new YouTube(GOOGLE_KEY);
		
		const vc = msg.member.voiceChannel;
		if(!vc) return msg.reply('You must be in the join voice channel, to start music!');
		if(!vc.permissionsFor(client.user).has(['CONNECT', 'SPEAK'])) return msg.reply('🚫 | I did not get permission `CONNECT` and `SPEAK`!');
		if(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/.test(args[0])){
			const playlist = await youtube.getPlaylist(args[0]);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const vid = await youtube.getVideoByID(video.id);
				await handleVideo(vid, msg, vc, true);
			}
			return msg.reply(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		}
		if(/https?:\/\//gi.test(args[0])){
			const video = await youtube.getVideo(args[0]);
			return handleVideo(video, msg, vc);
		}
		const videos = await youtube.searchVideos(args.join(' '), 1);
		if(!videos.length) return msg.reply('🚫 | No find the results you were looking for, please try again later!');
		const video = await youtube.getVideoByID(videos[0].id);
		return handleVideo(video, msg, vc);
	} catch (err) {
		return msg.channel.send(err.stack, { code: 'ini' });
	}
}

async function handleVideo (video, msg, voiceChannel, hide = false){
	const queue = msg.client.queue.get(msg.guild.id);
	const song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`,
		author: msg.author,
		video
	}
	if(!queue){
		try{
			const thisMess = await msg.channel.send('🏴 Joining voice channel....');
			const connection = await voiceChannel.join();
			const Queue = {
				channel: msg.channel,
				voiceChannel,
				connection,
				songs: [song],
				volume: 100,
				playing: true,
				loop: false
			}
			thisMess.delete();
			msg.client.queue.set(msg.guild.id, Queue);
			return play(msg, song);
		}catch(e){
			msg.client.queue.delete(msg.guild.id);
			return msg.channel.send(e.stack, { code: 'diff' } );
		}
	}
	queue.songs.push(song);
	//if(!hide) return msg.reply(`✅ Added to queue ${song.title} - ${song.authors.username}`);
   let MusicAdded = new Discord.RichEmbed()
   .setColor('#b8b6b6')
   .setDescription(`🎵 [${song.title}](${song.url}) has been added to the queue - [${song.author}]`)
   .setFooter(`Rabbit's All right reserved.`)
   .setTimestamp();
   msg.channel.send(MusicAdded);
}

function play(msg, song){
	const queue = msg.client.queue.get(msg.guild.id);
	if(!song){
		queue.voiceChannel.leave();
		return msg.client.queue.delete(msg.guild.id);
	}
	const vid = ytdl(song.url, {filter: 'audioonly' });
	const dispatcher = queue.connection.playStream(vid)
	.on('end', res => {
		const shifed = queue.songs.shift();
		if(queue.loop) queue.songs.push(shifed);
		play(msg, queue.songs[0]);
	})
	.on('error', console.error);
	dispatcher.setVolumeLogarithmic(queue.volume /100);
  let PlayingNew = new Discord.RichEmbed()
  .setColor('#b8b6b6')
  .setAuthor(`🎶 Start Playing:`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .setDescription(`**[${song.title}](${song.url}) - [${song.author}]**`)
  .setFooter(`Rabbit's All right reserved.`)
  .setTimestamp();
	queue.channel.send(PlayingNew);
}

module.exports.conf = {
  aliases: ["p"],
  clientPerm: "",
  authorPerm: ""
};

module.exports.help = {
  name: "play",
  description: "Play songs on youtube",
  usage: "play <url | query | playlist>",
  example: ["play oreno wasuremono", "play https://m.youtube.com/watch?v=UERDkJ5jMjs", "play http://www.youtube.com/playlist?list=PLxC_BSkebVLy4MbwKtpGSq0qv2ivZWl22"]
};