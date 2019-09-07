/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: commands/info/ping.js
 *****************************************/

const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate, createError } = require("../../functions.js");

module.exports = {
    name: 'whois',
    aliases: [ 'who', 'user', 'info' ],
    help: {
        description: '#locale{help:whois:description}',
        args: [
            {
                name: 'user_reference',
                type: [ 'mention', 'id', 'fragment' ],
                description: '#locale{help:whois:args:user_reference:description}',
                required: false
            }
        ]
    },
    run: async (client, message, args) => {
        const member = getMember(args.join(' '));

        // No member fetched? Return an error
        if(member === null) return message.channel.send(createError(`That user doesn't exist on this server, ${message.author}`));

        // Check server date and time settings
        let server_id = message.guild.id;
        let guild_set = Object.prototype.hasOwnProperty.call(client.settings.guilds, server_id);

        const dateFormat = guild_set
            ? client.settings.guilds[server_id].date_time.format
            : client.settings.guilds.default.date_time.format;

        // Member variables
        const joined = formatDate(member.joinedAt, dateFormat);     // Format using guild date and time format settings
        const roles = member.roles
            .filter(r => r.id !== server_id)
            .map(r => r).join(', ') || '(none)';
        
        // User variables
        const created = formatDate(member.user.createdAt, dateFormat);

        const embed = new RichEmbed()
            .setFooter(`Queried by ${message.author.tag}`, message.author.displayAvatarURL)
            .setTitle(`User card`)
            .setAuthor(member.diplayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

            .addField('Server member info',
            stripIndents`
                **> Displayed name (own or nicked):** ${member.displayName}
                **> Member joined at:** ${joined}
                **> Assigned roles:** ${roles}
            `.trim(), true)

            .addField('User account info',
            stripIndents`
                **> User ID:** ${member.user.id}
                **> Username:** ${member.user.username}
                **> Discord TAG:** ${member.user.tag}
                **> Account created at:** ${created}
            `.trim(), true);
        
        // todo => playing a game
        
        if(message.member.hasPermission([
            'MANAGE_MESSAGES',
            'KICK_MEMBERS',
            'BAN_MEMBERS'
        ])) {
            const warns         = client.activity.moderation.warns;
            const bans          = client.activity.moderation.bans;
            const mutes         = client.activity.moderation.mutes;
            const statistics    = client.activity.moderation.statistics;

            let amount = {
                warns: 0,
                kicks: 0,
                bans: 0,
                mutes: 0
            }

            if(Object.prototype.hasOwnProperty.call(warns, server_id)) {
                // todo
            }

            embed
                .addField('Moderation informations',
                '<span style="color: red; background-color: black">***WARNING! These informations are meant for moderators and administrators only, but due to limitations, they are displayed publicily. Are you sure you want to display these informations here?***</span>')

                .addField('Speaking abilities',
                stripIndents`
                    **> Muted in:** <list of channel the member is muted in, or global mute>
                    **> Time left until last mute wears off:** <time left>
                `.trim(), true)

                .addField('Member violations',
                stripIndents`
                    **> Has been warned** <number> time(s)
                    **> Has been banned** <number> time(s)
                    **> Has been kicked** <number> time(s)
                    **> Has been muted** <number> time(s)
                `.trim(), true)
        }

    }
}
