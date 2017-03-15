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
    /* Analyze message and check if the command has some params */
    var msgSyntax = message.content.toLowerCase().split(' ');
    switch (msgSyntax[1]) {
      case "--list":
        /* List all roles available on the server! */
        guildRoles = message.guild.roles.map(role => role.name);
        var strRoles = '';
        guildRoles.forEach(guildRole => {
          strRoles += guildRole + ',\n';
        });

        message.channel.sendMessage(
          tsundereJSON.function[COMMAND].guildRoles.header + '\n\n' +
          strRoles.replace('@', '') + '\n' +
          tsundereJSON.function[COMMAND].guildRoles.footer
        );

        return 'OK!';
      break;
      case "--set":

      break;
      default:
        /* Get the message sender roles if no params where specified */
        var userRoles = message.member.roles.map(role => role.name);
        var strRoles = '';
        userRoles.forEach(roleName => {
          strRoles += roleName + ',\n';
        });

        message.channel.sendMessage(
          tsundereJSON.function[COMMAND].userRoles.header + '\n\n' +
          strRoles.replace('@', '') + '\n' +
          tsundereJSON.function[COMMAND].userRoles.footer
        );
        return 'OK!';
      break;
    }
    /* Set role */

    // Get the current roles on the server
    /*
    console.log(message.guild.roles);
    console.log("\n");
    */

    /*
    var roles = message.guild.roles.map(role => [role.name]);
    console.log(roles);
    */
  }
}
