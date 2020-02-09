/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: commands/dev/shutdown.js
 *****************************************/

const { createError, resolveLocale } = require("../../functions.js");
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
        ) return message.channel.send(createError("`error`: `not a developer`"));

        let delay = (args.length > 0) ? args[0] : '5s';

        // TODO: Inform everyone about the closure

        // Logout
        setTimeout(client.destroy(), 5000);
    }
}