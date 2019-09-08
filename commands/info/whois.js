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
        const member = getMember(message, args.join(' '));

        // No member fetched? Return an error
        if(member === null) return message.channel.send(createError(`That user doesn't exist on this server, ${message.author}`));

        // Check server date and time settings
        let server_id = message.guild.id;
        let guild_set = Object.prototype.hasOwnProperty.call(client.settings.guilds, server_id);

        const localeCode = guild_set
            ? client.settings.guilds[server_id].locale
            : client.settings.guilds.default.locale;

        // Member variables
        const joined = formatDate(member.joinedAt, localeCode);     // Format using guild date and time format settings
        const roles = member.roles
            .filter(r => r.id !== server_id)
            .map(r => r).join(', ') || '(none)';
        
        // User variables
        const created = formatDate(member.user.createdAt, localeCode);

        const embed = new RichEmbed()
            .setFooter(`Queried by ${message.author.tag}`, message.author.displayAvatarURL)
            .setTitle(`User card`)
            .setAuthor(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

            .addField('Server member info',
            stripIndents`
                **> Server nick:** ${member.displayName}
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
        
        if(member.user.presence.game) {
            let activity;

            switch(member.user.presence.game.type) {
                case 0:
                    activity = 'Currently playing';
                    break;
                case 1:
                    activity = 'Currently streaming';
                    break;
                case 2:
                    activity = 'Currently listening';
                    break;
                case 3:
                    activity = 'Currently watching';
                    break;
                default:
                    activity = 'Currently doing';
            }

            embed.addField(activity, stripIndents`
                **> Name:** ${member.user.presence.game.name}
            `.trim());
        }
        
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
                '***WARNING!*** These informations are meant for moderators and administrators only, but due to limitations, they are displayed publicily. Are you sure you want to display these informations here?')

                .addField('Speaking abilities',
                stripIndents`
                    **> Muted in:** <channels>
                    **> Time left:** <time left>
                `.trim(), true)

                .addField('Member violations',
                stripIndents`
                    **> Has been warned** <number> time(s)
                    **> Has been banned** <number> time(s)
                    **> Has been kicked** <number> time(s)
                    **> Has been muted** <number> time(s)
                `.trim(), true)
        }

        embed.setTimestamp();

        return await message.channel.send(embed);
    }
}
