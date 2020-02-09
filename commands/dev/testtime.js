/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: commands/dev/testtime.js
 *****************************************/

const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const { createError, resolveLocale, resolveTime, formatTime } = require("../../functions.js");
const literals = require("../../literals.js");

module.exports = {
    name: 'testtime',
    aliases: [ 'time' ],
    category: 'dev',
    help: {
        description: '#locale{commands:testtime:help:description}',
        args: [
            {
                name: 'time_string',
                type: literals.help.types.TIME,
                description: '#locale{commands:testtime:help:args:time_string:description}',
                required: true
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
        
        // Check if caller is a registered developer
        if(
            message.author.id !== client.settings.developers.chief &&
            !client.settings.developers.assistants.includes(message.author.id)
        ) return message.channel.send(createError(
            resolveLocale(client, "#locale{devs:errors:not_a_dev}", localeCode)
            .replace(/\[user\]/g, message.author)));

        // Check if the time has been specified
        if(args.length < 1) return message.channel.send(createError(resolveLocale(client, "#locale{commands:testtime:errors:missing_parameter}", localeCode)));

        // Get the time module
        let time_module = resolveTime(args[0]);

        // Check for errors
        if(Object.prototype.hasOwnProperty.call(time_module, 'error')) {
            switch(time_module.error) {
                case literals.time_errors.INVALID_FORMAT:
                    return message.channel.send(createError(resolveLocale(client, "#locale{commands:testtime:errors:invalid_format}", localeCode)));
                case literals.time_errors.INTERNAL_EXCEPTION:
                    return message.channel.send(createError(resolveLocale(client, "#locale{commands:testtime:errors:internal_exception}", localeCode)));
                default:
                    return message.channel.send(createError(resolveLocale(client, "#locale{commands:testtime:errors:unspecified_error}", localeCode)));
            }
        }

        let formatted_time = formatTime(client, message, time_module);

        return message.channel.send(stripIndents`
            \\> **${resolveLocale(client, "#locale{commands:testtime:query:queried_string}", localeCode)}:** \`${args[0]}\`
            \\> **${resolveLocale(client, "#locale{commands:testtime:query:result}", localeCode)}:** \`${formatted_time}\`
        `.trim());
    }
}