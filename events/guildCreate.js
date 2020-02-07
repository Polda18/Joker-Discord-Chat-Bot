/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: events/guildCreate.js
 *****************************************/

const {
    updatePresenceList,
    updatePresenceData
} = require("../functions.js");

module.exports = {
    name: 'guildCreate',
    run: async (client, guild) => {
        console.log(`Bot joined a new server: \`${guild.name}\`; ID: \`${guild.id}\``);

        // Do presence updates
        updatePresenceList(client);
        updatePresenceData(client, 'JOIN');

        console.log(`Presence updated whilst joining server \`${guild.name}\` with ID \`${guild.id}\``);
    }
}