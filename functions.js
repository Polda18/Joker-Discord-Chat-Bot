/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: functions.js
 *****************************************/

const literals = require("./literals.js");

module.exports = {
    createError = errorMessage => {
        return `\u274c ${errorMessage}`;        // \u274c = red cross mark unicode emoji
    },

    // Get a member from a string (or message) => to be used by a message event
    getMember = (message, toFind = '') => {
        toFind = toFind.toLowerCase();          // Convert the user to find to all lowercase

        let target = message.guild.members.get(toFind);     // Try to get the member by its ID

        if (!target && message.mentions.members)            // ID not found?
            target = message.mentions.members.first();      // Get the first member mention it can find
        
        if(!target && toFind) {                             // Mention not found?
            target = message.guild.members.find(
                m => m.displayName.toLowerCase().includes(toFind) || m.user.tag.toLowerCase().includes(toFind)
            );          // Get the user tag or nick by its fragment
        }

        if(!target && toFind) { target = null;      // Still not found? That's an error, right?
        } else {
            target = message.member;                // No query defined? Get the member from message author
        }

        return target;
    },

    // Get a channel from a string => to be used by a message event
    getChannel: (message, toFind) => {
        toFind = toFind.toLowerCase();      // Convert the channel to find to all lowercase

        let target = message.guild.channels.get(toFind);    // Try to get channel by its ID
        
        if (!target && message.mentions.channels)           // ID not found?
            target = message.mentions.channels.first();     // Get the first channel mention it can find
        
        if(!target)                         // Mention not found? Then get the channel from the fragment of the name
            target = message.guild.channels.find(c => c.name.toLowerCase().includes(toFind));
        
        if(!target) target = null;          // Still not found? That's an error right?
    },

    // Format the date (use date format from settings)
    formatDate: (date, format = 'en-US') => {
        return new Intl.DateTimeFormat(format).format(date);
    },

    // Change Discord presence
    changePresence: (client, status, type, value) => {
        client.user.setPresence({
            status: status,
            game: {
                name: value,
                type: type
            }
        });
    },

    // Update presence list
    updatePresenceList: (client, package) => {
        let server_num = client.guilds.map(g => g).length;

        client.presenceList = {
            list: [
                `${client.settings.guilds.default.prefix}help`,
                'Ping me to get this server prefix',
                `Hosted on ${server_num} server${server_num !== 1 ? 's' : ''}`,
                'More informations about me, please visit GitHub',
                package.homepage
            ],
            position: 0
        }
    },

    // Set up presence timer
    setupPresenceTimer: (client, package) => {
        // If there is an interval set, clear the interval (has to be in try/catch block, in case interval ID is ivalid)
        if(client.tickPresence && client.tickPresence )
            try { clearInterval(client.tickPresence) } catch(e) { console.error(e) };
        
        // Define a new interval
        client.tickPresence = setInterval(() => {
            let index = client.presenceList.position;
            let current_presence = client.presenceList.list[index];
    
            functions.changePresence(client, 'online', 'PLAYING', current_presence);
            client.presenceList.position = (index + 1) % client.presenceList.list.length;
        }, 5000);
    }
}