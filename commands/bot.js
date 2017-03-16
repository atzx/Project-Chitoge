/*
  @file: bot.js
  @version: 1.0
  @author: Eeveecario
  @date: September 29, 2016
  @description:
    Reply back if the bot is able to see the commands.
    NOTE: Maybe we can add some details of the bot in a future?
*/

const COMMAND = "!bot";

module.exports = {
  execute: function(client, message, tsundereJSON) {
    var msgParams = '';
    var commandParams = tsundereJSON.commands[COMMAND].explain.params;
    for (var param in commandParams) {
      console.log(param);
      msgParams += '**'+commandParams[param].syntax+'**: \n\t'+commandParams[param].definition+'\n';
    }
    message.channel.sendMessage(
      '** ' + COMMAND + ' **\n' +
      tsundereJSON.commands[COMMAND].explain.header+'\n\n' +
      msgParams + '\n' +
      tsundereJSON.commands[COMMAND].explain.footer
    );
    return 'OK!';
  },
  help: function(client, message, tsundereJSON) {
    var reply = tsundereJSON.commands[COMMAND].explain || "Contesto si estoy disponible";
    message.channel.sendMessage(reply);
    return "OK!";
  }
}
