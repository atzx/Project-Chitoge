// import the discord.js module from the node_modules folder
const Discord = require('discord.js');
const bot = new Discord.Client();

// the token of your bot - https://discordapp.com/developers/applications/me
/*
  Please keep this token a secret!
  NOTE:
    @Eeveecario: Gotta find a better way to protect this string and still be
    allowed to log in!
*/
const token = 'MjMwMTcwOTI3NTkyMjQzMjAw.Cst65A.9JbdaQWWOMcjWeUzsMomPhgaSi8';

/* Ready event! */
/*
  This will be the initial actions of the bot whenever it is ready to interact
  with other users in the discord!
*/
bot.on('ready', () => {
  console.log('Tsundere bot v0.1 ready to go!');
});

/* Message Event Listener! */
/*
  This section will be triggered whenever the bot detects a new message being
  added ON EVERY CHANNEL!
*/
bot.on('message', message => {
  /*
    Message: "!bot"
    Description:
      A message string replying back. This is a basic function to ask Chitoge if
      she's still alive.
  */
  if (message.content === '!bot') {
    message.channel.sendMessage('Llamaste?');
  }

  /*
    Message: "8Ball" + String
    Description:
      Ask Chitoge anything and she'll reply back with a random message! Similar
      to ask those balls which replies back "Yes", "No" or "Ask later". Of
      course we're adding more stuff to make this more fun!
    NOTE:
      @Eeveecario: This can be updated and more automatic! I'll be in charge of
      improving this system! If you like to modify this section, please contact
      me to be aware!
  */
  if (message.content.startsWith("8Ball")) {
    // Generate a random number and multiply it by 4, then round down.
    switch(Math.floor(Math.random()*4)) {
      case 0: message.channel.sendMessage("Estas pero bien idiota!");
      break;
      case 1: message.channel.sendMessage("Posiblemente, aunque para un primate como tú es imposible");
      break;
      case 2: message.channel.sendMessage("T-talvez...");
      break;
      case 3: message.channel.sendMessage("Y tu quien eres?!");
      break;
      default: message.channel.sendMessage("Huh?");
    }
  }
});

/* Finally, Log in! */
bot.login(token);
