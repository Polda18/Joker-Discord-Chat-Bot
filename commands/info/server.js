/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: commands/info/server.js
 *****************************************/

const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { formatDate, createError, resolveLocale } = require("../../functions.js");

module.exports = {
    name: 'serverinfo',
    aliases: [ 'server', 'sinfo' ],
    category: 'info',
    help: {
        description: '#locale{help:command:serverinfo:description}',
        args: []
    },
    run: async (client, message, args) => {
        // Check if a locale is set for this guild and fetch that settings
        const server_id = message.guild.id;
        const localeCode = (Object.prototype.hasOwnProperty.call(client.settings.guilds, server_id))
            ? client.settings.guilds[server_id].locale
            : client.settings.guilds.default.locale
            || client.settings.guilds.default.locale;
        
        const embed = new RichEmbed()
            .setFooter(resolveLocale("#locale{commands:serverinfo:query:footer}", localeCode)
                .replace(/\[author\]/g, message.author.tag.replace(/\$/g, '$$$$')), message.author.displayAvatarURL)
            .setTitle(resolveLocale("#locale{commands:serverinfo:query:title}", localeCode))
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setThumbnail(message.guild.iconURL)
            .setColor('RANDOM')

            .addField(resolveLocale("#locale{commands:serverinfo:query:basic_info:caption}", localeCode),
            stripIndents`
                **\\> ${
                    resolveLocale("#locale{commands:serverinfo:query:basic_info:description:id}", localeCode)
                }:** ${server_id}
                **\\> ${
                    resolveLocale("#locale{commands:serverinfo:query:basic_info:description:system_channel}", localeCode)
                }:** ${message.guild.systemChannel}
                **\\> ${
                    resolveLocale("#locale{commands:serverinfo:query:basic_info:description:member_count}", localeCode)
                }:** ${message.guild.memberCount}
                **\\> ${
                    resolveLocale("#locale{commands:serverinfo:query:basic_info:description:region}", localeCode)
                }:** ${message.guild.region}
            `.trim())
        
        embed.setTimestamp();
        
        await message.channel.send(embed);
    }
}