/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: events/guildDelete.js
 *****************************************/

module.exports = {
    name: 'guildDelete',
    run: async (client, guild) => {
        console.log(`Bot left a server: \`${guild.name}\`; ID: \`${guild.id}\``);

        // Do presence updates
        updatePresenceList(client);
        updatePresenceData(client, 'LEAVE');

        console.log(`Presence updated whilst leaving server \`${guild.name}\` with ID \`${guild.id}\``);
    }
}