/*
  @file: 8ball.js
  @version: 1.0
  @author: Eeveecario
  @date: September 29, 2016
  @description:
    Ask a question to the tsundere and it will reply back! Maybe we should stick
    a bit more to simple yes-no-maybe answers.
*/

const COMMAND = "!8ball";

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
    var rndm = Math.floor(Math.random() * tsundereJSON.commands[COMMAND].message.length);
    message.channel.sendMessage(tsundereJSON.commands[COMMAND].message[rndm]);
    return "OK!";
  }
}
