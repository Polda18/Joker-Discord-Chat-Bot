/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: commands/dev/testlocale.js
 *****************************************/

const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const { createError, resolveLocale } = require("../../functions.js");
const literals = require("../../literals.js");

module.exports = {
    name: 'testlocale',
    category: 'dev',
    help: {
        description: '#locale{commands:testlocale:help:description}',
        args: [
            {
                name: 'locale_string',
                type: literals.help.types.STRING,
                description: '#locale{commands:testlocale:help:args:locale_string:description}',
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
        ) return message.channel.send("`error`: `not a developer`");
        
        // Error = missing parameter
        if(args.length < 1) return message.channel.send(createError("`error`: `missing parm`"));
        
        // Get the locale string
        let localeString = args[0];

        // If a locale code is specified use that one
        let LocaleCodeSpec = (args.length > 1) ? args[1] : localeCode;

        // Return resolved locale
        let query = stripIndents`
            \`query\`: \`${localeString}\`
            \`resolved\`: \`${resolveLocale(client, localeString, LocaleCodeSpec)}\`
        `.trim();

        await message.channel.send(query);
    }
}