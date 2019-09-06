/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: serverinfo.js
 *****************************************/

const Discord = require("discord.js");
const permissions = require("./inc/permissions.js");

module.exports.run = async (client, message, args) => {
    // $$serverinfo <no args>
    // Admin or developer only command!

    let author_id = message.author.id;

    if(!permissions.check_permissions(client, message, "general", permissions.DEVELOPER)
        && !permissions.check_permissions(client, message, "general", permissions.ADMINISTRATOR))
        return message.channel.send(permissions.insufficient_perms(client, message, permissions.DEVELOPER | permissions.ADMINISTRATOR));
        // Insufficient permissions

    let server = message.guild;
    let members_count = server.members.array().length;

    let embed = new Discord.RichEmbed()
        .setTitle("Server info")
        .setDescription(`Server \`${server.name}\` has \`${members_count}\` user${(members_count > 1) ? 's' : ''}.`)
        .addField("Server owner", server.owner.user, true)
        .addField("Server created at", server.createdAt, true)
        .addField("Server id", server.id)
        .setColor("RANDOM")
        .setFooter(`Queried by ${message.author.tag}`)
        .setTimestamp();
    
    return message.channel.send(embed);
};

module.exports.helper = {
    name: 'serverinfo'
}
