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

const COMMAND = '!role';
const FORBIDDEN_ROLES = [
  '@EVERYONE',
  'EVERYONE',
  'BOT',
  'FOREIGNERS',
  'MOD',
  'DEVELOPERS',
  'ADMIN',
  'ADMINISTRATOR'
];

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
    /* Analyze message and check if the command has some params */
    var srcSyntax = message.content.split(' ');
    var msgSyntax = message.content.toLowerCase().split(' ');
    switch (msgSyntax[1]) {
      case '--list':
        /* List all roles available on the server! */
        guildRoles = message.guild.roles.map(role => role.name);
        var strRoles = '';
        guildRoles.forEach(guildRole => {
          strRoles += guildRole + ',\n';
        });

        message.channel.sendMessage(
          tsundereJSON.commands[COMMAND].guildRoles.header + '\n\n' +
          strRoles.replace('@', '') + '\n' +
          tsundereJSON.commands[COMMAND].guildRoles.footer
        );

        return 'OK!';
      break;
      case '--set':
        if (msgSyntax[2] == '' || msgSyntax[2] == null || msgSyntax[2] == undefined) {
          message.channel.sendMessage(
            tsundereJSON.commands[COMMAND].invalid_role.replace('<INVALID_ROLE>', srcSyntax[2])
          );
          return 'Invalid Role';
        }
        /* Load roles from the server */
        var guildRoles = message.guild.roles.map(role => role.name).map( role => {
          return role.toUpperCase();
        });

        guildRoles = guildRoles.filter(item => {
          return FORBIDDEN_ROLES.indexOf(item) === -1;
        })

        if(guildRoles.includes(msgSyntax[2].toUpperCase())) {
          message.member.addRole(message.guild.roles.find('name', srcSyntax[2])).catch(
            error => {
              console.log(error);
              message.channel.sendMessage(
                tsundereJSON.commands[COMMAND].forbidden_permission
              );
              return 'Forbidden permission';
            }
          );
          message.channel.sendMessage(
            tsundereJSON.commands[COMMAND].valid_role
          )
          return 'OK!';
        } else if (FORBIDDEN_ROLES.includes(msgSyntax[2].toUpperCase())) {
          message.channel.sendMessage(
            tsundereJSON.commands[COMMAND].forbidden_role
          );
          return 'Forbidden role';
        } else {
          message.channel.sendMessage(
            tsundereJSON.commands[COMMAND].unknown_role.replace('<INVALID_ROLE>', msgSyntax[2])
          );
          return 'Unknown role';
        }

      break;
      default:
        /* Get the message sender roles if no params where specified */
        var userRoles = message.member.roles.map(role => role.name);
        var strRoles = '';
        userRoles.forEach(roleName => {
          strRoles += roleName + ',\n';
        });

        message.channel.sendMessage(
          tsundereJSON.commands[COMMAND].userRoles.header + '\n\n' +
          strRoles.replace('@', '') + '\n' +
          tsundereJSON.commands[COMMAND].userRoles.footer
        );
        return 'OK!';
      break;
    }
  }
}
