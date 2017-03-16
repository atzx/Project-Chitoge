/*
  @file: help.js
  @version: 1.0
  @author: Eeveecario
  @date: September 29, 2016
  @description:
    Reply back with the available commands that is currently being supported.
    Also explains how to get depper information on each command.
*/

const COMMAND = "!help";

module.exports = {
  help: function(client, message, tsundereJSON) {
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
  execute: function(client, message, tsundereJSON) {
    var header = tsundereJSON.commands[COMMAND].messageHeader || "Comandos disponibles: \n\n";
    var footer = tsundereJSON.commands[COMMAND].messageFooter || "\nUtiliza **--help** para saber más del comando";

    var body = "";
    for (var command in tsundereJSON.commands) {
      body += command + "\n";
    }

    message.channel.sendMessage(header + body + footer);
    return "OK!";
  }
}
