/*
  @file: role.js
  @version: 1.0
  @author: Eeveecario
  @date: October 6th, 2016
  @description:
    Change the role of a user to the one specified. Must have privileges in
    order to be able to use it.
  @permissions:
    Developer, Admin.
*/

const COMMAND = "!role";

module.exports = {
  explain: function(client, message, tsundereJSON) {
    message.channel.sendMessage(tsundereJSON.function[COMMAND].explain);
    return "OK!";
  },
  execute: function(client, message, tsundereJSON) {
    // Guild ID
    var guildID = message.guild.id;

    // Get the current roles on the server
    console.log(message.guild.roles);
    console.log("\n");

    var roles = message.guild.roles.map(role => [role.name, role.permissions]);
    console.log(roles);
  }
}
