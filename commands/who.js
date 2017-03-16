/*
  @file: who.js
  @version: 1.0
  @author: Eeveecario
  @date: September 29, 2016
  @description:
    Pick a random user from the guild (server) and send reply it back.
    NOTE: Maybe we can create a command param to check out how many random
    users?
*/

const COMMAND = "!who";

module.exports = {
  help: function(client, message, tsundereJSON) {
    var msgParams = '';
    var commandParams = tsundereJSON.commands[COMMAND].explain.params;
    for (var param in commandParams) {
      console.log(param);
      msgParams += '**'+commandParams[param].syntax+'**\n\t'+commandParams[param].definition+'\n';
    }
    message.channel.sendMessage(
      '** ' + COMMAND + ' **\n' +
      tsundereJSON.commands[COMMAND].explain.header+'\n\n' +
      msgParams + '\n' +
      tsundereJSON.commands[COMMAND].explain.footer
    );
    return 'OK!';
  },
  execute: function(client, message, tsundereJSON) {
    var src = message.guild.id;
    /*
      Okay, this next line is a bit complicated, so here's the explanation.
      I'll go 1 by 1.
      BOT: The bot client
      GUILDS: The servers which this bot is added.
      GET(ID): Get an element by looking for the parameter. (Collection obj)
      MEMBERS: Get all users on the guild (as a User object).
      RANDOM(): Self explanitory.
      USER: Reference the object as user.
      USERNAME: Finally, the username.
    */
    var who = client.guilds.get(src).members.random().user.username;
    message.channel.sendMessage(who);
    return "OK!";
  }
}
