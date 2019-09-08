/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: commands/info/ping.js
 *****************************************/

const locales = require("../../locales.js");

module.exports = {
    name: 'ping',
    help: {
        description: '#locale{help:command:ping:description}',
        args: []
    },
    run: async (client, message, args) => {
        // Check if a locale is set for this guild and fetch that settings
        const server_id = message.guild.id;
        const localeCode = (Object.prototype.hasOwnProperty.call(client.settings.guilds, server_id))
            ? client.settings.guilds[server_id].locale
            : client.settings.guilds.default.locale
            || client.settings.guilds.default.locale;

        // Fetch setup message and send it
        const setupMsg = locales.locale_strings.ping.setup[localeCode] || locales.locale_strings.ping.setup[locales.default_locale];
        const msg = await message.channel.send(setupMsg);

        // Fetch formatted done message
        const doneMsg = locales.locale_strings.ping.done[localeCode] || locales.locale_strings.ping.done[locales.default_locale];
        
        // Replace format marks for usable variables
        const doneMsgRaw = doneMsg
            .replace('@message_latency', Math.round(msg.createdTimestamp - message.createdTimestamp))
            .replace('@api_latency', Math.round(client.ping));

        // Put raw formatted done message
        return await msg.edit(doneMsgRaw);
    }
}
