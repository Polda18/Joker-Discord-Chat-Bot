/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: commands/info/ping.js
 *****************************************/

const locales = require("../../locales.js");
const { resolveLocale } = require("../../functions.js");

module.exports = {
    name: 'ping',
    category: 'info',
    help: {
        description: '#locale{commands:ping:help:description}',
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
        const setupMsg = resolveLocale(client, "#locale{commands:ping:setup}", localeCode);
        const msg = await message.channel.send(setupMsg);

        // Fetch formatted done message and replace format marks for usable variables
        const doneMsg = resolveLocale(client, "#locale{commands:ping:done}", localeCode)
            .replace(/\[message_latency\]/g, Math.round(msg.createdTimestamp - message.createdTimestamp))
            .replace(/\[api_latency\]/g, Math.round(client.ping));

        // Put raw formatted done message
        return await msg.edit(doneMsg);
    }
}
