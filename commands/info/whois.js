/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: commands/info/whois.js
 *****************************************/

const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate, createError, resolveLocale } = require("../../functions.js");

module.exports = {
    name: 'whois',
    aliases: [ 'who', 'user', 'info' ],
    category: 'info',
    help: {
        description: '#locale{commands:whois:help:description}',
        args: [
            {
                name: 'user_reference',
                type: [ 'mention', 'id', 'fragment' ],
                description: '#locale{commands:whois:help:args:user_reference:description}',
                required: false
            }
        ]
    },
    run: async (client, message, args) => {
        // Check if a locale is set for this guild and fetch that settings
        const server_id = message.guild.id;
        const localeCode = (Object.prototype.hasOwnProperty.call(client.settings.guilds, server_id))
            ? client.settings.guilds[server_id].locale
            : client.settings.guilds.default.locale
            || client.settings.guilds.default.locale;
        
        // Get the member
        const member = getMember(message, args.join(' '));

        // No member fetched? Return an error
        if(member === null)
            return message.channel.send(createError(resolveLocale(client, "#locale{commands:whois:errors:nouser}", localeCode)
                .replace(/\[author\]/, message.author)));

        // Member variables
        const joined = formatDate(member.joinedAt, localeCode);     // Format date and time based on locale settings of guild
        const roles = member.roles
            .filter(r => r.id !== server_id)
            .map(r => r).join(', ') || resolveLocale(client, "#locale{commands:whois:query:text_none}", localeCode);
        
        // User variables
        const created = formatDate(member.user.createdAt, localeCode);

        const embed = new RichEmbed()
            .setFooter(resolveLocale(client, "#locale{commands:whois:query:embed:footer}", localeCode)
                .replace(/\[author\]/g, message.author.tag.replace(/\$/g, '$$$$')), message.author.displayAvatarURL)
            .setTitle(resolveLocale(client, "#locale{commands:whois:query:embed:title}", localeCode))
            .setAuthor(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

            .addField(resolveLocale(client, "#locale{commands:whois:query:embed:server_member_info:caption}", localeCode),
            stripIndents`
                **\\> ${
                    resolveLocale(client, "#locale{commands:whois:query:embed:server_member_info:description:nick}", localeCode)
                }:** ${member.displayName}
                **\\> ${
                    resolveLocale(client, "#locale{commands:whois:query:embed:server_member_info:description:joined}", localeCode)
                }:** ${joined}
                **\\> ${
                    resolveLocale(client, "#locale{commands:whois:query:embed:server_member_info:description:roles}", localeCode)
                }:** ${roles}
            `.trim(), true)

            .addField(resolveLocale(client, "#locale{commands:whois:query:embed:user_account_info:caption}", localeCode),
            stripIndents`
                **\\> ${
                    resolveLocale(client, "#locale{commands:whois:query:embed:user_account_info:description:id}", localeCode)
                }:** ${member.user.id}
                **\\> ${
                    resolveLocale(client, "#locale{commands:whois:query:embed:user_account_info:description:username}", localeCode)
                }:** ${member.user.username}
                **\\> ${
                    resolveLocale(client, "#locale{commands:whois:query:embed:user_account_info:description:tag}", localeCode)
                }:** ${member.user.tag}
                **\\> ${
                    resolveLocale(client, "#locale{commands:whois:query:embed:user_account_info:description:created}", localeCode)
                }:** ${created}
            `.trim(), true);
        
        if(member.user.presence.game) {
            let activity;

            switch(member.user.presence.game.type) {
                case 0:
                    activity = resolveLocale(client, "#locale{commands:whois:query:embed:activity:caption:playing}", localeCode);
                    break;
                case 1:
                    activity = resolveLocale(client, "#locale{commands:whois:query:embed:activity:caption:streaming}", localeCode);
                    break;
                case 2:
                    activity = resolveLocale(client, "#locale{commands:whois:query:embed:activity:caption:listening}", localeCode);
                    break;
                case 3:
                    activity = resolveLocale(client, "#locale{commands:whois:query:embed:activity:caption:watching}", localeCode);
                    break;
                default:
                    // Probably never to be used, but still better safe than sorry
                    activity = resolveLocale(client, "#locale{commands:whois:query:embed:activity:caption:doing}", localeCode);
            }

            embed.addField(activity, stripIndents`
                **\\> ${
                    // Locale string for the name of the activity
                    resolveLocale(client, "#locale{commands:whois:query:embed:activity:description}", localeCode)
                }:** ${member.user.presence.game.name}
            `.trim());
        }
        
        if(message.member.hasPermission([
            'MANAGE_MESSAGES',
            'KICK_MEMBERS',
            'BAN_MEMBERS'
        ])) {
            const mutes      = client.activity.moderation.mutes;
            const statistics = client.activity.moderation.statistics;

            let amount = {
                warns: 0,
                kicks: 0,
                bans: 0,
                mutes: 0
            }

            let speaking_abilities = {
                muted_in: [],
                time_left: resolveLocale(client, "#locale{commands:whois:query:text_none}", localeCode)
            }

            if(Object.prototype.hasOwnProperty.call(statistics, server_id)) {
                // todo
            }

            if(Object.prototype.hasOwnProperty.call(mutes, server_id)) {
                // todo
            }

            if(Object)

            embed
                .addField(resolveLocale(client, "#locale{commands:whois:query:embed:moderation:warning:caption}", localeCode),
                resolveLocale(client, "#locale{commands:whois:query:embed:moderation:warning:description}", localeCode))

                .addField(resolveLocale(client, "#locale{commands:whois:query:embed:moderation:speaking:caption}", localeCode),
                stripIndents`
                    **\\> ${
                        resolveLocale(client, "#locale{commands:whois:query:embed:moderation:speaking:description:muted_in}", localeCode)
                    }:** ${speaking_abilities.muted_in.length > 0
                        ? speaking_abilities.muted_in.join(', ')
                        : resolveLocale(client, "#locale{commands:whois:query:text_none}", localeCode)
                    }
                    **\\> ${
                        resolveLocale(client, "#locale{commands:whois:query:embed:moderation:speaking:description:time_left}", localeCode)
                    }:** ${speaking_abilities.time_left}
                `.trim(), true)

                .addField(resolveLocale(client, "#locale{commands:whois:query:embed:moderation:violations:caption}", localeCode),
                stripIndents`
                    **\\> ${
                        resolveLocale(client, "#locale{commands:whois:query:embed:moderation:violations:description:warned}", localeCode)
                    }** ${
                        resolveLocale(client, "#locale{commands:whois:query:embed:moderation:violations:description:number}", localeCode)
                            .replace(/\[number\]/g, amount.warns)
                    }
                    **\\> ${
                        resolveLocale(client, "#locale{commands:whois:query:embed:moderation:violations:description:banned}", localeCode)
                    }** ${
                        resolveLocale(client, "#locale{commands:whois:query:embed:moderation:violations:description:number}", localeCode)
                            .replace(/\[number\]/g, amount.bans)
                    }
                    **\\> ${
                        resolveLocale(client, "#locale{commands:whois:query:embed:moderation:violations:description:kicked}", localeCode)
                    }** ${
                        resolveLocale(client, "#locale{commands:whois:query:embed:moderation:violations:description:number}", localeCode)
                            .replace(/\[number\]/g, amount.kicks)
                    }
                    **\\> ${
                        resolveLocale(client, "#locale{commands:whois:query:embed:moderation:violations:description:muted}", localeCode)
                    }** ${
                        resolveLocale(client, "#locale{commands:whois:query:embed:moderation:violations:description:number}", localeCode)
                            .replace(/\[number\]/g, amount.mutes)
                    }
                `.trim(), true)
        }

        embed.setTimestamp();

        return await message.channel.send(embed);
    }
}
