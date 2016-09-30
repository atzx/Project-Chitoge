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
  execute: function(client, message, tsundereJSON) {
    var rndm = Math.floor(Math.random() * tsundereJSON.function[COMMAND].message.length);
    message.channel.sendMessage(tsundereJSON.function[COMMAND].message[rndm]);
    return "OK!";
  },
  explain: function(client, message, tsundereJSON) {
    message.channel.sendMessage(tsundereJSON.function[COMMAND].explain);
    return "OK!";
  }
}
