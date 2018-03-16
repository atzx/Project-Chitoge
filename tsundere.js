/*
  @File: Tsundere.js
  @Date: September 26, 2016
  @Version: 0.1
  @Description:
    The main file for the bot. This is the starting point!
*/

/* #### Constants! ########################################################## */
/* Libraries! */
const Discord = require('discord.js');
const fs = require('fs');
var express = require('express');

/* Values! */
const bot = new Discord.Client();
//The token of your bot - https://discordapp.com/developers/applications/me
const TOKEN = process.env.TOKEN
            || 'MjMwMDIyNDI5MzIwMjgyMTEz.C6r6sg.9NX-HEd01ir2w5UZFoPo12SYtho';

/* #### Global Variables! ################################################### */
/*
  NOTE: We can try making a .conf or a config file to change some initial values
*/
var tsundere = "Chitoge";
var app = express();
var obj = JSON.parse(fs.readFileSync('tsunderes/'+tsundere+".json", 'utf8'));
var commands = {};
var commandList = [];

/* #### Functions ########################################################### */

/*
  @function: loadCommandFiles
  @description:
    Load the files for the commands located in the /commands/ directory.
    All loaded functions will be added to the "commands" array declared in
    variables.
  @param {array} commands -
    An array of strings containing all the commands loaded from the JSON file.
    The string will include a "!" char before the actual command.
  @returns {Object}:
    Returns an object containing the functions for each command the bot
    supports.
*/
function loadCommandFiles(commandList) {
  var objReturner = {}
  for (var index in commandList) {
    var temp = commandList[index].replace("!", "");
    console.log(temp);
    objReturner[commandList[index]] = require("./commands/"+temp+".js");
  }
  return objReturner;
}

/* #### Listeners! ########################################################## */
/* Ready Event Listener! */
/*
  This will be the initial actions of the bot whenever it is ready to interact
  with other users in the discord!
*/
console.log("Loading...");

bot.on('ready', () => {
  // Initial message
  console.log('Tsundere bot v0.1 ready to go!');
  /*
    console.log("------------------------------");
    console.log("JSON: ");
    console.log(obj);
    console.log("------------------------------");
  */

  // Load all available commands to display with "help"
  commandsJSON = obj.commands;
  for (var command in commandsJSON) {
    commandList.push(command);
  }

  commands = loadCommandFiles(commandList);
  // console.log(commands);
});

/* Message Event Listener! */
/*
  This section will be triggered whenever the bot detects a new message being
  added ON EVERY CHANNEL!
*/
bot.on('message', message => {
  if (message.content.startsWith("!")) {
    // Have a variable to not mind lower and/or uppercase in the message.
    var msg = message.content.toLowerCase();
    var command = message.content.split(" ")[0];
    console.log("Command: "+command);

    if(command in commands) {
      if (msg.includes("--help") || msg.includes("--explain")) {
        commands[command].help(bot, message, obj);
        return;
      }

      commands[command].execute(bot, message, obj);
    }else{

      //Unknown Command!
      message.channel.sendMessage(obj.unknownCommand);
    }
  }
});

/* Newcomer listener! */
/*
  This section will be triggered when a member joins the server. This can allow
  the bot to send a direct message to the bot, assign a role and shoutout
  him/her on the general chat!
*/

/* New Server Member! */
bot.on("guildMemberAdd", (guild, member) => {
  // Log activity
  console.log("New member: " + member.user.username);
  console.log("Guild name: " + guild.name);

  /* Public welcome! */

  // Create message
	var reply = obj.newMember.guild_msg.header || "Bienvenid@!";
  reply = reply.replace("<USERNAME>", member.user.username); // Insert username;
  reply = reply.replace("<GUILD>", guild.name) // Insert guildname
  reply += obj.newMember.guild_msg.body + obj.newMember.guild_msg.footer;

  // Welcoming message to the main channel!
  guild.channels.get(guild.id).sendMessage(reply);

  /* Private message! */

  //Build message
  var dirMsg =
    obj.newMember.private_msg.header + "\n\n" +
    obj.newMember.private_msg.intro + "\n" +
    obj.newMember.private_msg.body + "\n\n" +
    obj.newMember.private_msg.footer;
  dirMsg = dirMsg.replace("<GUILD>", guild.name) // Insert guildname
  dirMsg = dirMsg.replace("<BOTNAME>", obj.name) // Insert current tsundere

  // Direct Message welcoming!
  member.sendMessage(dirMsg).then(message => console.log('Mensaje personal enviado')).catch(console.error);

  /* Further actions! */

});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Tsundere-bot running at port: '+app.get('port'));
})

/* Finally, Log in! */
bot.login(TOKEN);
