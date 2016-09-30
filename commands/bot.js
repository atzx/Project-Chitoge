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
    var reply = tsundereJSON.function[COMMAND].message || "Hola";
    message.channel.sendMessage(reply);
    return "OK!";
  },
  explain: function(client, message, tsundereJSON) {
    var reply = tsundereJSON.function[COMMAND].explain || "Contesto si estoy disponible";
    message.channel.sendMessage(reply);
    return "OK!";
  }
}
