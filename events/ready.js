/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: events/ready.js
 *****************************************/

const { updatePresenceList, setupPresenceTimer } = require('../functions.js');

module.exports = {
    name: 'ready',
    run: client => {
        console.log(`Bot logged in as \`${client.user.tag}\`, user ID: \`${client.user.id}\``);

        const chiefdev = client.fetchUser(process.env.CHIEF_DEVELOPER);

        // Fetch contact informations
        client.contact = {
            email: process.env.CONTACT_EMAIL,
            issue_tracker: process.env.CONTACT_ISSUES,
            discord_dm: (chiefdev) ? chiefdev.tag : null,
            websites: process.env.CONTACT_WEBSITES
        }

        // Do presence updates
        updatePresenceList(client);
        setupPresenceTimer(client);
    }
}