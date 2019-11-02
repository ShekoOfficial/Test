const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const sql = require('sqlite');
const db = require('quick.db');
const config = require('./config.json');
const levelerCore = require('./functions/levelSystem');
const talkedRecently = new Set();

sql.open(`./db/mainDB.sqlite`);

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split('.')[0];

    client.on(eventName, (...args) => eventFunction.run(client, ...args, sql));
  });
});

client.on('ready', function() {
  console.log(`Bot has started, with ${client.users.size} users, ${client.guilds.size} guilds.`); 
      setInterval(async () => {
    const statuslist = [
     ` uwu!help | Global 🌎 prefix is uwu!`,
     ` Hello ${client.users.size} Users! & ${client.guilds.size} Guilds!`,
     ` Uwu Premium soon v.5.2.0`

    ]
    const random = Math.floor(Math.random() * statuslist.length);
    try {
      await client.user.setPresence({
        game: {
          name: `${statuslist[random]}`, 
          type: "WATCHING",
          url: 'https://www.twitch.com'
        },
        status: "idle"
      });
    } catch (error) {
      console.error(error);
    }
  }, 60000);
});

client.on('guildMemberAdd', async (member, bot, message, args) => {
let onoff = await db.fetch(`WelcomeOnOff_${member.guild.id}`)
if(!onoff) return null;
let welch = await db.fetch(`Welcome_${member.guild.id}`)
if(!welch) return null
if(welch) {
  let ch = member.guild.channels.get(`${welch}`)
  ch.send(`Hello ${member} Welcome to server **${member.guild.name}** Discord Server!`)
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

/*client.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./json/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: config.prefix
    };
  }*/

client.on("guildMemberAdd", member => {
	let autorole = JSON.parse(fs.readFileSync("./joinrole.json", "utf8"));
	if (!autorole[member.guild.id]) { // jika tidak ada autorole yang di set, agar tidak error saat ada yang join
		autorole[member.guild.id] = {
			autorole: config.autorole
		};
	}
	var role = autorole[member.guild.id].role;
	if (!role) return; // jika autorole 0 maka akan dihentikan dan tidak menyebabkan error
	member.addRole(role);
});

client.on("message", message => {
  if (message.author.bot) return; //ignores bots
  //if (message.channel.type !== 'text') return; 
  if (message.channel.type === 'dm'){
    if (!message.content.startsWith(config.prefix)){
      client.users.get(config.ownerID).send(`${message.author.id}, ${message.author.username}: ${message.content}`);
    }else{
      let command = message.content.split(' ')[0];
      command = command.slice(config.prefix.length);
  
      let args = message.content.split(' ').slice(1); //passing through the argument content
  
      try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args, sql, Discord);
      } catch (err) {
        console.log(err);
        client.users.get(config.ownerID).send(`${err}`);
        return;
      }
    }
  }else{
    if (!message.content.startsWith(config.prefix)){//checks if the user is NOT typing a command
      sql.all(`SELECT roleName FROM bListRoles WHERE guildID=${message.guild.id}`).then(rCheck=>{
        var blRoles = rCheck.map(g=>g.roleName);
        if(message.member.roles.some(r=>blRoles.includes(r.name)) || message.guild.id == "264445053596991498" || message.guild.id == "110373943822540800") {
          return;
        }else{
          if (talkedRecently.has(message.author.id)) {
            return;
          }else{
            levelerCore.scoreSystem(client, message, sql, Discord);
            talkedRecently.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after 2.5 seconds
            talkedRecently.delete(message.author.id);
            }, 4000);
          }
        }
      });
    }else{//user IS typing a command
    //splits input to commands
      let command = message.content.split(' ')[0];
      command = command.slice(config.prefix.length);
  
      let args = message.content.split(' ').slice(1); //passing through the argument content
  
      try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args, sql, Discord);
      } catch (err) {
        console.log(err);
        client.users.get(config.ownerID).send(`${err}`);
        return;
      }
    }
  }
});

client.login(config.token);