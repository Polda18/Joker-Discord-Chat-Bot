/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: functions.js
 *****************************************/

const { Permissions } = require("discord.js");
const locales = require("./locales.js");
const literals = require("./literals.js");

const colors = require("colors");

module.exports = {
    createError: errorMessage => {
        return `\u274c ${errorMessage}`;        // \u274c = red cross mark unicode emoji
    },

    createSuccess: successMessage => {
        return `\u2705 ${successMessage}`;      // \u2705 = green check mark unicode emoji
    },

    createInfo: infoMessage => {
        return `\u2139 ${infoMessage}`;         // \u2139 = blue info mark unicode emoji
    },

    // Get a member from a string (or message) => to be used by a message event
    getMember: (message, toFind = '') => {
        if(!toFind) return message.member;      // No query defined? Return message author member

        toFind = toFind.toLowerCase();          // Convert the user to find to all lowercase

        let target = message.guild.members.get(toFind);     // Try to get the member by its ID

        if (!target && message.mentions.members)            // ID not found?
            target = message.mentions.members.first();      // Get the first member mention it can find
        
        if(!target) {                             // Mention not found?
            target = message.guild.members.find(
                m => m.displayName.toLowerCase().includes(toFind) || m.user.tag.toLowerCase().includes(toFind)
            );          // Get the user tag or nick by its fragment
        }

        if(!target) {
            target = null;      // Still not found? That's an error, right?
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
        client.user.setStatus(status);
        client.user.setActivity(value, {type: type});
    },

    // Update presence list
    updatePresenceList: client => {
        let server_num = client.guilds.map(g => g).length;

        client.presenceList = {
            list: [
                `${client.settings.guilds.default.prefix}help`,
                'Ping me to get this server prefix',
                `Hosted on ${server_num} server${server_num !== 1 ? 's' : ''}`,
                'More informations about me, please visit GitHub',
                'http://bit.ly/JokerBot'
            ],
            position: 0
        }
    },

    // Set up presence timer
    setupPresenceTimer: client => {
        // If there is an interval set, clear the interval (has to be in try/catch block, in case interval ID is ivalid)
        if(client.tickPresence) try { clearInterval(client.tickPresence) } catch(e) { console.error(e) };
        
        // Define a new interval
        client.tickPresence = setInterval(() => {
            let index = client.presenceList.position;
            let current_presence = client.presenceList.list[index];
    
            module.exports.changePresence(client, 'online', 'PLAYING', current_presence);
            client.presenceList.position = (index + 1) % client.presenceList.list.length;
        }, 5000);
    },

    // Update presence data
    updatePresenceData: (client, event) => {
        // If there is an interval set, clear the interval (has to be in try/catch block, in case interval ID is ivalid)
        if(client.tickPresence) try { clearInterval(client.tickPresence) } catch(e) { console.error(e) };

        // Change a presence to a message about a join or leave
        switch(event) {
            case 'JOIN':
                module.exports.changePresence(client, 'dnd', 'WATCHING', 'Joined a new server');
                break;
            case 'LEAVE':
                module.exports.changePresence(client, 'dnd', 'WATCHING', 'Left a server');
                break;
            default:
                console.error(`Invalid argument passed: updatePresenceData(client, event) => {event == ${event}}`);
        }

        // Set a new interval after 5 seconds
        setTimeout(() => module.exports.setupPresenceTimer(client), 5000);
    },

    // Temporary function to resolve locale string using new locales schema
    resolveLocaleNew: (client, localeString, localeCode) => {
        localeString = localeString.toLowerCase().trim();

        // Anything else than #locale{<content>} isn't a locale string
        if(!localeString.startsWith('#locale{') || !localeString.endsWith('}')) return localeString;

        if(!literals.locales.includes(localeCode)) return null;     // Could not recognise locale code

        if(Object.prototype.hasOwnProperty.call(literals.locales_map, localeCode))
            localeCode = literals.locales_map[localeCode];          // No country code encountered, map to default country
        
        // Check a locale string for any matches
        const regex = /#locale\{([a-zA-Z0-9_:]+)\}/g;

        // Get the content of the brackets and split by colon
        let content = regex.exec(localeString)[1].split(':');

        // Check if the locale is available
        let hasLocale = Object.prototype.hasOwnProperty.call(client.locales.localeStrings, localeCode);

        let resolvedLocale = content.reduce((o, i) => {
            try {
                return o[i];
            } catch(e) {
                console.error(`Cannot find locale string \`${localeString}\` for language \`${localeCode}\`. Perhaps missing?`);
                console.error(e);
                return undefined;
            }
        }, client.locales.locale_strings[localeCode]);

        if(!resolvedLocale || resolvedLocale === undefined) {
            resolvedLocale = content.reduce((o, i) => {
                try {
                    return o[i];
                } catch(e) {
                    console.error(`Cannot find locale string \`${localeString}\` for language \`${localeCode}\`. Perhaps missing?`);
                    console.error(e);
                    return undefined;
                }
            }, client.locales.locale_strings[client.locales.fallback_locale]);

            if(!resolvedLocale || resolvedLocale === undefined) return null;    // Undefined, returns to null
        }

        return resolvedLocale;      // Return a resolved locale then
    },

    // Resolve locale string
    resolveLocale: (localeString, localeCode) => {
        localeString = localeString.toLowerCase().trim();

        // Anything else than #locale{<content>} isn't a locale string
        if(!localeString.startsWith('#locale{') || !localeString.endsWith('}')) return localeString;

        if(!literals.locales.includes(localeCode)) return null;     // Could not recognise locale code

        if(Object.prototype.hasOwnProperty.call(literals.locales_map, localeCode))
            localeCode = literals.locales_map[localeCode];          // No country code encountered, map to default country

        // Check a locale string for any matches
        const regex = /#locale\{([a-zA-Z0-9_:]+)\}/g;

        // Get the content of the brackets and split by colon
        let content = regex.exec(localeString)[1].split(':');

        // Get the available locales for this locale string
        let availableLocales = content.reduce((o, i) => {
            try {
                return o[i];        // Decompile string to an object reference
            } catch(e) {
                console.error(`Cannot find locale string \`${localeString}\` for language \`${localeCode}\`. Perhaps missing?`);
                console.error(e);
                return undefined;   // If reached an unreachable end, return undefined (safe reference)
            }
        }, locales.locale_strings);

        if(!availableLocales || availableLocales.constructor !== Object) return null;       // Reached an unreachable reference

        // Locale string for this locale code not found => use default locale code
        if(!Object.prototype.hasOwnProperty.call(availableLocales, localeCode)) return availableLocales[locales.default_locale];

        // Get and return the correct locale string
        return availableLocales[localeCode];
    },

    validatePermission: permission => {
        if(typeof permission !== 'string' && !Array.isArray(permission)) return false;

        let validate = true;

        if(Array.isArray(permission)) {
            permission.forEach(p => {
                validate = validate && Object.prototype.hasOwnProperty.call(Permissions.FLAGS, p);
            });

            return validate;
        } else {
            return Object.prototype.hasOwnProperty.call(Permissions.FLAGS, permission);
        }
    }
}
