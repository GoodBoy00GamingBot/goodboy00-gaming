const Discord = require('discord.js');
const client = new Discord.Client();
const {RichEmbed} = require('discord.js');
const settings = require('./settings.json');
const fs = require('fs');
const yt = require('ytdl-core');
const superagent = require('superagent');

//const db = require('quick.db');

var prefix = "!gb ";

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  guild.defaultChannel.send(`Please welcome ${member} to the server!`);
});

client.on('guildMemberRemove', member => {
  let guild = member.guild;
  guild.defaultChannel.send(`Please say goodbye to ${member} we will miss you!`);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('I am online !');
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  //client.user.setStatus('online')
  client.user.setActivity(`a$ help | ${client.guilds.size} Servers`, { type: 'STATUS' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : `!tbg help | ${client.guilds.size} Servers`}`))
  .catch(console.error);
});

client.on('message', async msg => {
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  var result = args.join(' ');

  if (msg.content.startsWith(prefix + 'ping')) {
    const m = await msg.channel.send("Ping ?");
    m.edit(`Pong! Latency is **${m.createdTimestamp - msg.createdTimestamp}**ms. API Latency is **${Math.round(client.ping)}**ms`);
  }
  if (msg.content.startsWith(prefix + 'commands')) {
    const at = await msg.channel.send("You need help, really ? Well than, here it is...");
    at.edit('+------------------------------------+ \n Welcome!\n This is a GoodBoy00 Gaming Official Bot !\n List of current commands:\n !gb ping - pong \n !gb help - A help page with a lists of commands \n !gb info - A info page about this bot \n !gb todo - Status page \n !gb administrator - A list of administrative commands that this bot offers \n !gb music - A list of music commands that this bot offers \n +------------------------------------+ ');
  }
  if (msg.content.startsWith(prefix + 'info')) {
    msg.channel.send('STATUS: |Online| \n Current Version: |1.0.0| \n Developed by | TheBestGamerYT | \n This is an early version of GoodBoy00 Gaming Official Bot so expect it to be unstable');
  }
  if (msg.content.startsWith(prefix + 'todo')) {
    msg.channel.send('Planned stuff: \n - Administrative command (mute) \n - Music Commands(playing music from youtube,pausing,etc..)');
  }
  if (msg.content.startsWith(prefix + 'administrator')) {
    msg.channel.send('Current Administrative commands are: \n !gb mute - you can mute a choosen player \n !gb kick - you can kick a choosen player !gb ban - you can ban a choosen player');
  }
  if (msg.content.startsWith(prefix + 'music')) {
    msg.channel.send('Current Music Commands are: \n !gb play - select a song name that you wanna hear \n !gb pause - pause the player');
  }
  if (msg.content.startsWith(prefix + 'mute')){
    msg.channel.send('Coming soon... - Sorry :(');
  }
  if (msg.content.startsWith(prefix + 'kick')){
    if(!msg.member.roles.some(r=>["GB Admin","GB Moderator"].includes(r.name)) )
    return msg.reply("Sorry, you don't have permissions to use this!");
    let member = msg.mentions.members.first() || msg.guild.members.get(args[0]);
        if(!member)
          return msg.reply("Please mention a valid member of this server");
        if(!member.kickable) 
          return msg.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided... :/";
        await member.kick(reason)
          .catch(error => msg.reply(`Sorry ${msg.author} I couldn't kick because of : ${error}`));
        msg.reply(`${member.user.tag} has been kicked by ${msg.author.tag} **Reason:** ${reason}`);
  }
   if (msg.content.startsWith(prefix + 'ban')){
    if(!msg.member.roles.some(r=>["GB Admin"].includes(r.name)) )
    return msg.reply("Sorry, you don't have permissions to use this!");
  
  let member = msg.mentions.members.first();
  if(!member)
    return msg.reply("Please mention a valid member of this server");
  if(!member.bannable) 
    return msg.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

  let reason = args.slice(1).join(' ');
  if(!reason) reason = "No reason provided... :/";
  
  await member.ban(reason)
    .catch(error => msg.reply(`Sorry ${msg.author} I couldn't ban because of : ${error}`));
    msg.reply(`${member.user.tag} has been banned by ${msg.author.tag} Reason: ${reason}`);
    
  }
  if (msg.content.startsWith(prefix + 'setprefix')){
    if(!msg.member.roles.some(r=>["GB Admin"].includes(r.name)) )
    return msg.reply("Sorry, you don't have permissions to use this!");

    if(!args[0] || args[0 == "help"]) return msg.reply("Usage: !gb prefix <desired prefix here>");
  }
  if (msg.content.startsWith(prefix + 'pause')){
    msg.channel.send('Coming soon... - Sorry :(');
  }

  if (msg.content.startsWith(prefix + 'setgame')) {
    if(!msg.member.roles.some(r=>["GB Admin"].includes(r.name)) )
    return msg.reply("Sorry, you don't have permissions to use this!");

    let result = args.slice(1).join(' ');
    
    client.user.setActivity(result);
    msg.reply("New Game has been set !");
  }

  if (msg.content.startsWith(prefix + 'help')) {
    msg.channel.send({embed: {
  "plainText": "Welcome this is **Best Gamer Plays** Bots Help Page !",
  "title": "Help:",
  "author": {
    "name": "Click here to invite me !",
    "url": "https://discordapp.com/oauth2/authorize?client_id=540599770876739584&scope=bot&permissions=0",
    "icon_url": "https://cdn.discordapp.com/avatars/262636562355978240/cf3420f3776a85e2cd898bb43114b946.png?size=2048"
  },
  "color": 53380,
  "footer": {
    "text": "|Made by TheBestGamerYT For GoodBoy00|Powered by Heroku |© 2020|"
  },
  "fields": [
    {
      "name": "Utility",
      "value": "• !gb ping - pong !",
      "inline": true
    },
    {
      "name": "Support",
      "value": "• !gb commands - List of commands",
      "inline": true
    }
  ]
 }});
}

  if (msg.content.startsWith(prefix + 'myavatar')){
    msg.member.send(msg.author.avatarURL);
    msg.reply('Check your dms !');
  }
  if (msg.content.startsWith(prefix + 'avatar')){
    let member = msg.mentions.members.first();
    msg.member.send(member.user.displayAvatarURL);
    msg.reply('Check your dms !');
  }
  if (msg.content.startsWith(prefix + 'sendlove')){
    let member = msg.mentions.members.first();
    msg.member.send('❤️ I Love You ! Happy Valentines Day ! ❤️');
    msg.reply('A message had been sent sucessfully !');
  }
  if (msg.content.startsWith(prefix + 'recievelove')){
    msg.member.send('❤️ I Love You ! Happy Valentines Day ! ❤️');
    msg.reply('A message had been sent sucessfully !');
  }
 / https://www.reddit.com/r/nsfw
  if (msg.content.startsWith(prefix + 'gift')){
    msg.send('Now pick anything that you wish to gift and write it down in a chat.');
   if(msg.content === 'heart'){
     msg.reply('Good Choice and to whom do you wish to send it to ?');
     
     let member = msg.mentions.members.first();
     msg.member.send('Someone had sent you a ❤️ !. GG');
   }
   else if(msg.content === 'champagne'){
    msg.reply('Good Choice and to whom do you wish to send it to ?');
     
    let member = msg.mentions.members.first();
    msg.member.send('Someone had sent you a ❤️ !. GG');
   }

  }
  if (msg.content.startsWith(prefix + 'play Feel Da Rush')){
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join()
        .then(connection => {
          msg.reply('I have successfully connected to the voice channel !');
          const dispatcher = connection.playFile('C:/Users/Franc/Music/Freddy_Kalas_Feel_Da_Rush.mp3');
        })
    } else {
      msg.reply('You need to join a voice channel first!');
    }
  }

  if (msg.content.startsWith(prefix + 'join')){
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join()
          msg.reply('I have successfully joined to the voice channel !');
    }
  }
  if (msg.content.startsWith(prefix + 'leave')){
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.leave()
          msg.reply('I have successfully left the voice channel !');
    }
  }
  if (msg.content.startsWith(prefix + 'play')){
    const YouTube = require('simple-youtube-api');
    const youtube = new YouTube('AIzaSyAglJHmmD5ffpUDfXQU4mh3w86xxRtQDhA');

    youtube.searchVideos('Centuries', 4)
    .then(results => {
        msg.reply(`The video's title is ${results[0].title}`);
    })
.catch(console.log);
  }
  
 if (msg.content.startsWith(prefix + 'random-girl')){
  let {
    body
} = await superagent
    .get(`https://www.reddit.com/r/nsfw`);
const nsfwembed = new Discord.RichEmbed()
    .setTitle("Look at that, right now !")
    .setColor("RANDOM")
    .setImage(body.url)
msg.channel.send(nsfwembed);
 }
});

client.login(settings.token);