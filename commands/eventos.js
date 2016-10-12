/*
  @file: eventos.js
  @version: 1.0
  @author: Waymas,Eveecario
  @date: October 11, 2016
  @description:
    Reply the next events.
    NOTE: reddit/smash.gg feed for easier management?
*/

const COMMAND = "!eventos";

module.exports = {
  execute: function(client, message, tsundereJSON) {
    var eventos = tsundereJSON.function[COMMAND].loseventos;
    var reply = "";
    for (var evento in eventos){
      var obj = eventos[evento];
      reply += obj.nombre + "\n" + obj.link + "\n" + obj.lugar + "\n" + obj.fecha + "\n\n";
    }
    message.channel.sendMessage(reply);
    return "OK!";
  },
  explain: function(client, message, tsundereJSON) {
    var reply = tsundereJSON.function[COMMAND].explain || "lista de eventos";
    message.channel.sendMessage(reply);
    return "OK!";
  }
}
