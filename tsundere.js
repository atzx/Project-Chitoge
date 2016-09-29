/*
  @File: Tsundere.js
  @Date: September 26, 2016
  @Version: 0.1
  @Descriptition:
    The main file for the bot. This is the starting point!
*/

/* #### Constants! ########################################################## */
/* Libraries! */
const Discord = require('discord.js');
const fs = require('fs');

/* Values! */
const bot = new Discord.Client();
//The token of your bot - https://discordapp.com/developers/applications/me
const TOKEN = 'MjMwMTcwOTI3NTkyMjQzMjAw.Cst65A.9JbdaQWWOMcjWeUzsMomPhgaSi8';
const _8BALL = [
  "Y tu quien eres?!",
  "Estas pero bien idiota!",
  "HA! Nunca!",
  "Para alguien más es facil, pero para un primate como tú es imposible!",
  "T-Talvez...",
  "Si!",
  "P-por supuesto que sí! Pero deja de preguntarme cuando todo mundo está viendo..."
];
/* #### End of constants! ################################################### */

/* #### Variables! ########################################################## */
/*
  NOTE: We can try making a .conf or a config file to change some initial values
*/
var tsundere = "Chitoge";
var obj = JSON.parse(fs.readFileSync('tsunderes/'+tsundere+".json", 'utf8'));
var commands = [];
/* #### End of variables! ################################################### */

/* #### Listeners! ########################################################## */
/* Ready Event Listener! */
/*
  This will be the initial actions of the bot whenever it is ready to interact
  with other users in the discord!
*/
bot.on('ready', () => {
  // Initial message
  console.log('Tsundere bot v0.1 ready to go!');
  console.log("------------------------------");
  console.log("JSON: ");
  console.log(obj);
  console.log("------------------------------");

  // Load all available commands to display with "help"
  commandsJSON = obj.function;
  for (var command in commandsJSON) {
    commands.push(command);
  }
  console.log(commands);
});

/* Message Event Listener! */
/*
  This section will be triggered whenever the bot detects a new message being
  added ON EVERY CHANNEL!
*/
bot.on('message', message => {
  // Have a variable to not mind lower and/or uppercase in the message.
  var msg = message.content.toLowerCase();
  /*
    NOTE: How can we isolate each function in a file, in order to just call that
    file and run it when we get a command?.
  */

  /*
    Command: !help;
    Description:
      Shows the current list of function available to use for the tsundere!
      Keep in mind that this is an exact feed from the JSON file!
  */
  if (msg === "!help") {
    var text = "Esto es en lo que te puedo ayudar por el momento: \n\n";
    for (var index in commands) {
      text += commands[index] + "\n";
    }
    text += "\nY si quieres saber como funciona cada uno, preguntame el comando "+
    "que quieres que te explique agregando **'--explain'** después. Si te " +
    "explico ahorita nunca dejaré de perder mi tiempo contigo!";
    message.channel.sendMessage(text);
  }
  /*
    Message: "!bot"
    Description:
      A message string replying back. This is a basic function to ask Chitoge if
      she's still alive.
  */
  if (msg === '!bot') {
    message.channel.sendMessage('Llamaste?');
  }

  /*
    Message: "!Quien", "!Who"
    Description:
      Ask the bot a "Who" question, and the bot will reply back with a user or
      more currently on the server.
  */
  if (msg.startsWith("!quien") || msg.startsWith("!who")) {
    // Get the guild (server) where the comment was sent to.
    var src = message.guild.id
    /*
      Okay, this next line is a bit complicated, so here's the explanation.
      I'll go 1 by 1.
      BOT: The bot client
      GUILDS: The servers which this bot is added.
      GET(ID): Get an element by looking for the parameter.
      MEMBERS: Get all users on the guild (as a User object).
      RANDOM(): Self explanitory.
      USER: Reference the object as user.
      USERNAME: Finally, the username.
    */
    var who = bot.guilds.get(src).members.random().user.username;
    //var random = Math.floor(Math.random()*101);
    message.channel.sendMessage(who);
  }

  /*
    Message: String + "> 8Ball"
    Description:
      Ask Chitoge anything and she'll reply back with a random message! Similar
      to ask those balls which replies back "Yes", "No" or "Ask later". Of
      course we're adding more stuff to make this more fun!
    NOTE:
      @Eeveecario: This can be updated and more automatic! I'll be in charge of
      improving this system! If you like to modify this section, please contact
      me to be aware!
  */

  if (msg.startsWith("!8ball")) {
    /* Check if the command is properly well written */
    message.channel.sendMessage(
      _8BALL[Math.floor(Math.random() * _8BALL.length)]
    );
  }
});

/* Finally, Log in! */
bot.login(TOKEN);
