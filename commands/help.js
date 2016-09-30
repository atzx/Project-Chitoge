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
  execute: function(client, message, tsundereJSON) {
    var header = tsundereJSON.function[COMMAND].messageHeader || "Comandos disponibles: \n\n";
    var footer = tsundereJSON.function[COMMAND].messageFooter || "\nUtiliza **--explain** para saber más del comando";

    var body = "";
    for (var command in tsundereJSON.function) {
      body += command + "\n";
    }

    message.channel.sendMessage(header + body + footer);
    return "OK!";
  },
  explain: function(client, message, tsundereJSON) {
    message.channel.sendMessage(tsundereJSON.function[COMMAND].explain);
    return "OK!";
  }
}
