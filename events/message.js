/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: events/message.js
 *****************************************/

const locales = require("../locales.js");

module.exports = {
    name: 'message',
    run: async (client, message) => {
        // Get prefix from server settings
        let server_id = message.guild.id;           // Get the server ID
        let guild_set = Object.prototype.hasOwnProperty.call(client.settings.guilds, server_id);
        const prefix = guild_set ? client.settings.guilds[server_id].prefix : client.settings.guilds.default.prefix;

        if(message.author.bot) return;              // Ignore bot messages
        if(!message.guild) return;                  // Ignore direct messages
        if(!message.content.startsWith(prefix)) {   // Message doesn't start with prefix? It's not a command, actually
            // Is the bot pinged? Return current command prefix
            if(message.mentions.members.has(message.guild.me.id)) {
                // Fetch locale code
                const localeCode = (Object.prototype.hasOwnProperty.call(client.settings.guilds, server_id))
                    ? client.settings.guilds[server_id].locale
                    : client.settings.guilds.default.locale
                    || client.settings.guilds.default.locale;

                // Fetch prefix message
                const prefixMsg = locales.locale_strings.get_prefix[localeCode] || locales.locale_strings.get_prefix[locales.default_locale];

                // Escape dollar characters with double dollars, where applicable (due to behaviour of replace method)
                const prefixEscaped = prefix.replace(/\$/g, '$$$$');    // Four dollars since two dollars in replace string mean one dollar

                // Replace formatting code for prefix
                const prefixMsgRaw = prefixMsg.replace(/\[prefix\]/g, prefixEscaped);    // Use escaped sequence

                // Return prefix message
                await message.reply(prefixMsgRaw);
            }

            // And end event
            return;
        }

        // Check if there is a message member
        if(!message.member) message.member = await message.guild.fetchMember(message);

        // Get args
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd  = args.shift().toLowerCase();

        if(cmd.length === 0) return;                // Ignore empty command

        let command = client.commands.get(cmd);     // Fetch command
        if(!command) command = client.commands.get(client.aliases.get(cmd));        // If unsuccessful, check aliases

        if (command) command.run(client, message, args);        // If a command was found, run it
    }
}