/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: commands/dev/testlocale.js
 *****************************************/

const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const { formatDate, createError, resolveLocale } = require("../../functions.js");
const literals = require("../../literals.js");

module.exports = {
    name: 'testlocale',
    category: 'dev',
    help: {
        description: '#locale{commands:testlocale:help:description}',
        args: [
            {
                name: 'locale_string',
                type: 'string',
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
        
        // Error = missing parameter
        if(args.length < 1) return message.channel.send(createError("`error`: `missing parm`"));
        
        // Get the locale string
        let locale_string = args.join(" ");

        // Return resolved locale
        let query = stripIndents`
            \`query\`: \`${locale_string}\`
            \`resolved\`: \`${resolveLocale(client, locale_string, localeCode)}\`
        `.trim();

        await message.channel.send(query);
    }
}