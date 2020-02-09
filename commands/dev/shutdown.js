/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: commands/dev/shutdown.js
 *****************************************/

const { createError, resolveLocale, resolveTime, formatTime, timeToMiliseconds } = require("../../functions.js");
const literals = require("../../literals.js");

module.exports = {
    name: 'shutdown',
    category: 'dev',
    help: {
        description: '#locale{commands:shutdown:help:description}',
        args: [
            {
                name: 'delay',
                type: literals.help.types.TIME,
                description: '#locale{commands:shutdown:help:args:delay:description}',
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
        
        // Check if caller is a registered developer
        if(
            message.author.id !== client.settings.developers.chief &&
            !client.settings.developers.assistants.includes(message.author.id)
        ) return message.channel.send(createError(
            resolveLocale(client, "#locale{devs:errors:not_a_dev}", localeCode)
            .replace(/\[user\]/g, message.author)));

        // Get the delay argument
        let delay_arg = (args.length > 0) ? args[0] : '5s';

        // Resolve it to time module
        let delay = resolveTime(delay_arg);

        // Check for errors
        if(Object.prototype.hasOwnProperty.call(delay, 'error')) {
            switch(delay.error) {
                case literals.time_errors.INVALID_FORMAT:
                    return message.channel.send(createError(resolveLocale(client, "#locale{commands:shutdown:errors:invalid_format}", localeCode)));
                case literals.time_errors.INTERNAL_EXCEPTION:
                    return message.channel.send(createError(resolveLocale(client, "#locale{commands:shutdown:errors:internal_exception}", localeCode)));
                default:
                    return message.channel.send(createError(resolveLocale(client, "#locale{commands:shutdown:errors:unspecified_error}", localeCode)));
            }
        }

        // Get the formatted time
        let delay_str = formatTime(client, message, delay);

        let delay_ms = timeToMiliseconds(delay);

        // TODO: Inform everyone about the closure
        message.channel.send(resolveLocale(client, "#locale{commands:shutdown:notice}", localeCode)
            .replace(/\[time\]/g, delay_str.replace(/\$/g, '$$$$')));

        // Logout
        setTimeout(() => client.destroy(), delay_ms);
    }
}