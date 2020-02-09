/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: functions.js
 *****************************************/

const { Permissions } = require("discord.js");
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

    // Convert a special string #locale{<content>} into translated text
    resolveLocale: (client, localeString, localeCode) => {
        localeString = localeString.toLowerCase().trim();

        // Anything else than #locale{<content>} isn't a locale string
        if(!localeString.startsWith('#locale{') || !localeString.endsWith('}')) return localeString;

        if(!literals.locales.includes(localeCode)) return null;     // Could not recognise locale code

        if(Object.prototype.hasOwnProperty.call(literals.locales_map, localeCode))
            localeCode = literals.locales_map[localeCode];          // No country code encountered, map to default country
        
        // Check a locale string for any matches
        const regex = /#locale\{([a-zA-Z0-9\-_:]+)\}/g;
        let regex_results = regex.exec(localeString);
        if(!regex_results || regex_results === null) return null;   // Error, invalid input

        // Get the content of the brackets and split by colon
        let content = regex_results[1].split(':');

        // Check if the locale is available
        let hasLocale = Object.prototype.hasOwnProperty.call(client.locales.locale_strings, localeCode);

        let resolvedLocale = content.reduce((o, i) => {
            try {
                return o[i];
            } catch(e) {
                console.error(`Cannot find locale string \`${localeString}\` for language \`${localeCode}\`. Perhaps missing?`);
                console.error(e);
                return undefined;
            }
        }, (hasLocale) ? client.locales.locale_strings[localeCode] : client.locales.locale_strings[client.locales.fallback_locale]);

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

    // Validate permission from Discord set of permissions
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
    },

    // Check time and resolve a time integer in miliseconds
    resolveTime: timeString => {
        let regex = /^(?<y>[1-9][0-9]*y)?(?<m>[1-9][0-9]*m)?(?<w>[1-9][0-9]*w)?(?<d>[1-9][0-9]*d)?(?<h>[1-9][0-9]*h)?(?<min>[1-9][0-9]*min)?(?<s>[1-9][0-9]*s?)?$/i;

        // Get the regex results
        let results = timeString.match(regex);
        if(results === null) return {error: literals.time_errors.INVALID_FORMAT};       // Invalid format

        let matches = results.groups;
        if(matches === null) return {error: literals.time_errors.INTERNAL_EXCEPTION};   // Internal exception

        let time_module = {
            y: 0,
            m: 0,
            w: 0,
            d: 0,
            h: 0,
            min: 0,
            s: 0
        };

        // Count the matches
        let matches_count = 0;
        for(key in matches) {
            if(!Object.prototype.hasOwnProperty.call(matches, key)) continue;           // Ignore prototype keys

            if(matches[key] !== undefined) {
                time_module[key] = parseInt(matches[key]);                              // Parse the matched number to the time_module
                if(time_module[key] === NaN || time_module[key] === null) {             // Number hasn't been parsed - unlikely, but better safe than sorry
                    return {error: literals.time_errors.INTERNAL_EXCEPTION};            // Return an internal exception
                }
                ++matches_count;            // Increase matches count
            }
        }

        // Check if the number of matches is greater than zero
        if(matches_count < 1) return {error: literals.time_errors.INVALID_FORMAT};      // Return an invalid format

        // Check if one of the time units in time module are too big numbers
        if(time_module.y === Infinity || time_module.y === NaN) return {error: literals.time_errors.TOO_BIG_NUMBER};        // Too large number
        if(time_module.m === Infinity || time_module.m === NaN) return {error: literals.time_errors.TOO_BIG_NUMBER};
        if(time_module.w === Infinity || time_module.w === NaN) return {error: literals.time_errors.TOO_BIG_NUMBER};
        if(time_module.d === Infinity || time_module.d === NaN) return {error: literals.time_errors.TOO_BIG_NUMBER};
        if(time_module.h === Infinity || time_module.h === NaN) return {error: literals.time_errors.TOO_BIG_NUMBER};
        if(time_module.min === Infinity || time_module.min === NaN) return {error: literals.time_errors.TOO_BIG_NUMBER};
        if(time_module.s === Infinity || time_module.s === NaN) return {error: literals.time_errors.TOO_BIG_NUMBER};

        // Check the values => years can be infinite, but months should only be less than year, etc.

        // Years compared to other units
        if(time_module.y > 0 && time_module.m >= 12)
            // Years specified and month is defined as 12+ (over a year)
            return {error: literals.time_errors.INVALID_FORMAT};
        if(time_module.y > 0 && time_module.w >= 52)
            // Years specified and week is defined as 52+ (over a year)
            return {error: literals.time_errors.INVALID_FORMAT};
        if(time_module.y > 0 && time_module.d >= 365)
            // Years specified and days are defined as 365+ (over a year)
            return {error: literals.time_errors.INVALID_FORMAT};
        if(time_module.y > 0 && time_module.h >= 8766)
            // Years specified and hours are defined as 8766+ (over a year)
            return {error: literals.time_errors.INVALID_FORMAT};
        if(time_module.y > 0 && time_module.min >= 525949)
            // Years specified and minutes are defined as 525949+ (over a year)
            return {error: literals.time_errors.INVALID_FORMAT};
        if(time_module.y > 0 && time_module.s >= 31556926)
            // Years specified and seconds are defined as 31556926+ (over a year)
            return {error: literals.time_errors.INVALID_FORMAT};
        
        // Months compared to other units
        if(time_module.m > 0 && time_module.w >= 4)
            // Months specified and weeks are defined as 4+ (over a month)
            return {error: literals.time_errors.INVALID_FORMAT};
        if(time_module.m > 0 && time_module.d >= 30)
            // Months specified and days are defined as 30+ (over a month)
            return {error: literals.time_errors.INVALID_FORMAT};
        if(time_module.m > 0 && time_module.h >= 730)
            // Months specified and hours are defined as 730+ (over a month)
            return {error: literals.time_errors.INVALID_FORMAT};
        if(time_module.m > 0 && time_module.min >= 43829)
            // Months specified and minutes are defined as 43829+ (over a month)
            return {error: literals.time_errors.INVALID_FORMAT};
        if(time_module.m > 0 && time_module.s >= 2629744)
            // Months specified and seconds are defined as 2629744+ (over a month)
            return {error: literals.time_errors.INVALID_FORMAT};
        
        // Weeks compared to other units
        if(time_module.w > 0 && time_module.d >= 7)
            // Weeks specified and days are defined as 7+ (over a week)
            return {error: literals.time_errors.INVALID_FORMAT};
        if(time_module.w > 0 && time_module.h >= 168)
            // Weeks specified and hours are defined as 168+ (over a week)
            return {error: literals.time_errors.INVALID_FORMAT};
        if(time_module.w > 0 && time_module.min >= 10080)
            // Weeks specified and minutes are defined as 10080+ (over a week)
            return {error: literals.time_errors.INVALID_FORMAT};
        if(time_module.w > 0 && time_module.s >= 604800)
            // Weeks specified and seconds are defined as 604800+ (over a week)
            return {error: literals.time_errors.INVALID_FORMAT};
        
        // Days compared to other units
        if(time_module.d > 0 && time_module.h >= 24)
            // Days specified and hours are defined as 24+ (over a day)
            return {error: literals.time_errors.INVALID_FORMAT};
        if(time_module.d > 0 && time_module.min >= 1440)
            // Days specified and minutes are defined as 1440+ (over a day)
            return {error: literals.time_errors.INVALID_FORMAT};
        if(time_module.d > 0 && time_module.s >= 86400)
            // Days specified and seconds are defined as 86400+ (over a day)
            return {error: literals.time_errors.INVALID_FORMAT};
        
        // Hours compared to other units
        if(time_module.h > 0 && time_module.min >= 60)
            // Hours specified and minutes are defined as 60+ (over an hour)
            return {error: literals.time_errors.INVALID_FORMAT};
        if(time_module.h > 0 && time_module.s >= 3600)
            // Hours specified and seconds are defined as 3600+ (over an hour)
            return {error: literals.time_errors.INVALID_FORMAT};
        
        // Minutes compared to other units
        if(time_module.min > 0 && time_module.s >= 60)
            // Minutes specified and seconds are defined as 60+ (over a minute)
            return {error: literals.time_errors.INVALID_FORMAT};

        // Return time module
        return time_module;
    },

    // Turn time module into formatted string
    formatTime: (client, message, time_module) => {
        // Check if a locale is set for this guild and fetch that settings
        const server_id = message.guild.id;
        const localeCode = (Object.prototype.hasOwnProperty.call(client.settings.guilds, server_id))
            ? client.settings.guilds[server_id].locale
            : client.settings.guilds.default.locale
            || client.settings.guilds.default.locale;
        
        // Set up module for conversions
        let converted_time = { y: 0, m: 0, w: 0, d: 0, h: 0, min: 0, s: 0 };

        // Fetch and convert the time module for readable time
        converted_time.s = time_module.s % 60;

        converted_time.min = time_module.min;
        converted_time.min += Math.floor(time_module.s / 60);
        converted_time.min %= 60;

        converted_time.h = time_module.h;
        converted_time.h += Math.floor(time_module.min / 60)
            + Math.floor(time_module.s / 3600);
        converted_time.h %= 24;

        converted_time.d = time_module.d;
        converted_time.d += Math.floor(time_module.h / 24)
            + Math.floor(time_module.min / 1440)
            + Math.floor(time_module.s / 86400);
        converted_time.d %= 7;

        converted_time.w = time_module.w;
        converted_time.w += Math.floor(time_module.d / 7)
            + Math.floor(time_module.h / 168)
            + Math.floor(time_module.min / 10080)
            + Math.floor(time_module.s / 604800);
        converted_time.w %= 4;

        converted_time.m = time_module.m;
        converted_time.m += Math.floor(time_module.w / 4)
            + Math.floor(time_module.d / 30)
            + Math.floor(time_module.h / 730)
            + Math.floor(time_module.min / 43829)
            + Math.floor(time_module.s / 2629744);
        converted_time.m %= 12;

        converted_time.y = time_module.y;
        converted_time.y += Math.floor(time_module.m / 12)
            + Math.floor(time_module.w / 52)
            + Math.floor(time_module.d / 365)
            + Math.floor(time_module.h / 8766)
            + Math.floor(time_module.min / 525949)
            + Math.floor(time_module.s / 31556926);
        
        // Get the localized strings
        let localize = {
            years: module.exports.resolveLocale(client, "#locale{time:format:years}", localeCode),
            months: module.exports.resolveLocale(client, "#locale{time:format:months}", localeCode),
            weeks: module.exports.resolveLocale(client, "#locale{time:format:weeks}", localeCode),
            days: module.exports.resolveLocale(client, "#locale{time:format:days}", localeCode),
            hours: module.exports.resolveLocale(client, "#locale{time:format:hours}", localeCode),
            minutes: module.exports.resolveLocale(client, "#locale{time:format:minutes}", localeCode),
            seconds: module.exports.resolveLocale(client, "#locale{time:format:seconds}", localeCode)
        };

        // Get the contents
        let format_regex = /\#(?<string>\{[^\{\}\[\]]*\})(?<range>\[([1-9][0-9]*\+?|[1-9][0-9]*\-[1-9][0-9]*)\])/g;
        let results = {
            years: [],
            months: [],
            weeks: [],
            days: [],
            hours: [],
            minutes: [],
            seconds: []
        };
        let m;

        // Iterate through years
        while((m = format_regex.exec(localize.years)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if(m.index === format_regex.lastIndex) format_regex.lastIndex++;

            m.forEach((match, groupIndex) => {
                // console.log(`Found [${groupIndex}]: \`${match}\``);
                switch(groupIndex) {
                    case 1:
                    case 2:
                        results.years.push(match);
                        break;
                    default:
                        // Ignored
                }
            });
        }

        // Iterate through months
        while((m = format_regex.exec(localize.months)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if(m.index === format_regex.lastIndex) format_regex.lastIndex++;

            m.forEach((match, groupIndex) => {
                // console.log(`Found [${groupIndex}]: \`${match}\``);
                switch(groupIndex) {
                    case 1:
                    case 2:
                        results.months.push(match);
                        break;
                    default:
                        // Ignored
                }
            });
        }

        // Iterate through weeks
        while((m = format_regex.exec(localize.weeks)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if(m.index === format_regex.lastIndex) format_regex.lastIndex++;

            m.forEach((match, groupIndex) => {
                // console.log(`Found [${groupIndex}]: \`${match}\``);
                switch(groupIndex) {
                    case 1:
                    case 2:
                        results.weeks.push(match);
                        break;
                    default:
                        // Ignored
                }
            });
        }

        // Iterate through days
        while((m = format_regex.exec(localize.days)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if(m.index === format_regex.lastIndex) format_regex.lastIndex++;

            m.forEach((match, groupIndex) => {
                // console.log(`Found [${groupIndex}]: \`${match}\``);
                switch(groupIndex) {
                    case 1:
                    case 2:
                        results.days.push(match);
                        break;
                    default:
                        // Ignored
                }
            });
        }

        // Iterate through hours
        while((m = format_regex.exec(localize.hours)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if(m.index === format_regex.lastIndex) format_regex.lastIndex++;

            m.forEach((match, groupIndex) => {
                // console.log(`Found [${groupIndex}]: \`${match}\``);
                switch(groupIndex) {
                    case 1:
                    case 2:
                        results.hours.push(match);
                        break;
                    default:
                        // Ignored
                }
            });
        }

        // Iterate through minutes
        while((m = format_regex.exec(localize.minutes)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if(m.index === format_regex.lastIndex) format_regex.lastIndex++;

            m.forEach((match, groupIndex) => {
                // console.log(`Found [${groupIndex}]: \`${match}\``);
                switch(groupIndex) {
                    case 1:
                    case 2:
                        results.minutes.push(match);
                        break;
                    default:
                        // Ignored
                }
            });
        }

        // Iterate through seconds
        while((m = format_regex.exec(localize.seconds)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if(m.index === format_regex.lastIndex) format_regex.lastIndex++;

            m.forEach((match, groupIndex) => {
                // console.log(`Found [${groupIndex}]: \`${match}\``);
                switch(groupIndex) {
                    case 1:
                    case 2:
                        results.seconds.push(match);
                        break;
                    default:
                        // Ignored
                }
            });
        }

        // Set up locales preparation
        let results_sorted = {
            years: [],
            months: [],
            weeks: [],
            days: [],
            hours: [],
            minutes: [],
            seconds: []
        };

        let locales = {
            years: [],
            months: [],
            weeks: [],
            days: [],
            hours: [],
            minutes: [],
            seconds: []
        };

        // Iterate through pairs
        for(let i = 0; i < results.years.length; i += 2) results_sorted.years.push({ string: results.years[i], range: results.years[i + 1] });
        for(let i = 0; i < results.months.length; i += 2) results_sorted.months.push({ string: results.months[i], range: results.months[i + 1] });
        for(let i = 0; i < results.weeks.length; i += 2) results_sorted.weeks.push({ string: results.weeks[i], range: results.weeks[i + 1] });
        for(let i = 0; i < results.days.length; i += 2) results_sorted.days.push({ string: results.days[i], range: results.days[i + 1] });
        for(let i = 0; i < results.hours.length; i += 2) results_sorted.hours.push({ string: results.hours[i], range: results.hours[i + 1] });
        for(let i = 0; i < results.minutes.length; i += 2) results_sorted.minutes.push({ string: results.minutes[i], range: results.minutes[i + 1] });
        for(let i = 0; i < results.seconds.length; i += 2) results_sorted.seconds.push({ string: results.seconds[i], range: results.seconds[i + 1] });

        // Debug
        // console.log(results_sorted);

        // Set up conversions => years
        results_sorted.years.forEach(pair => {
            let string = pair.string.substring(1, pair.string.length - 1);
            let range_string = pair.range.substring(1, pair.range.length - 1);
            let range = {};

            if(range_string.includes('+')) {
                range.max = Infinity;
                range.min = Number.parseInt(range_string.substring(0, range_string.length - 1));
            } else if(range_string.includes('-')) {
                range.min = Number.parseInt(range_string.substring(0, range_string.lastIndexOf('-')));
                range.max = Number.parseInt(range_string.lastIndexOf('-') + 1, range_string.length);
            } else {
                range.min = range.max = Number.parseInt(range_string);
            }

            locales.years.push({ string: string, range: range });
        });

        // Set up conversions => months
        results_sorted.months.forEach(pair => {
            let string = pair.string.substring(1, pair.string.length - 1);
            let range_string = pair.range.substring(1, pair.range.length - 1);
            let range = {};

            if(range_string.includes('+')) {
                range.max = Infinity;
                range.min = Number.parseInt(range_string.substring(0, range_string.length - 1));
            } else if(range_string.includes('-')) {
                range.min = Number.parseInt(range_string.substring(0, range_string.lastIndexOf('-')));
                range.max = Number.parseInt(range_string.lastIndexOf('-') + 1, range_string.length);
            } else {
                range.min = range.max = Number.parseInt(range_string);
            }

            locales.months.push({ string: string, range: range });
        });

        // Set up conversions => weeks
        results_sorted.weeks.forEach(pair => {
            let string = pair.string.substring(1, pair.string.length - 1);
            let range_string = pair.range.substring(1, pair.range.length - 1);
            let range = {};

            if(range_string.includes('+')) {
                range.max = Infinity;
                range.min = Number.parseInt(range_string.substring(0, range_string.length - 1));
            } else if(range_string.includes('-')) {
                range.min = Number.parseInt(range_string.substring(0, range_string.lastIndexOf('-')));
                range.max = Number.parseInt(range_string.lastIndexOf('-') + 1, range_string.length);
            } else {
                range.min = range.max = Number.parseInt(range_string);
            }

            locales.weeks.push({ string: string, range: range });
        });

        // Set up conversions => days
        results_sorted.days.forEach(pair => {
            let string = pair.string.substring(1, pair.string.length - 1);
            let range_string = pair.range.substring(1, pair.range.length - 1);
            let range = {};

            if(range_string.includes('+')) {
                range.max = Infinity;
                range.min = Number.parseInt(range_string.substring(0, range_string.length - 1));
            } else if(range_string.includes('-')) {
                range.min = Number.parseInt(range_string.substring(0, range_string.lastIndexOf('-')));
                range.max = Number.parseInt(range_string.lastIndexOf('-') + 1, range_string.length);
            } else {
                range.min = range.max = Number.parseInt(range_string);
            }

            locales.days.push({ string: string, range: range });
        });

        // Set up conversions => hours
        results_sorted.hours.forEach(pair => {
            let string = pair.string.substring(1, pair.string.length - 1);
            let range_string = pair.range.substring(1, pair.range.length - 1);
            let range = {};

            if(range_string.includes('+')) {
                range.max = Infinity;
                range.min = Number.parseInt(range_string.substring(0, range_string.length - 1));
            } else if(range_string.includes('-')) {
                range.min = Number.parseInt(range_string.substring(0, range_string.lastIndexOf('-')));
                range.max = Number.parseInt(range_string.lastIndexOf('-') + 1, range_string.length);
            } else {
                range.min = range.max = Number.parseInt(range_string);
            }

            locales.hours.push({ string: string, range: range });
        });

        // Set up conversions => minutes
        results_sorted.minutes.forEach(pair => {
            let string = pair.string.substring(1, pair.string.length - 1);
            let range_string = pair.range.substring(1, pair.range.length - 1);
            let range = {};

            if(range_string.includes('+')) {
                range.max = Infinity;
                range.min = Number.parseInt(range_string.substring(0, range_string.length - 1));
            } else if(range_string.includes('-')) {
                range.min = Number.parseInt(range_string.substring(0, range_string.lastIndexOf('-')));
                range.max = Number.parseInt(range_string.lastIndexOf('-') + 1, range_string.length);
            } else {
                range.min = range.max = Number.parseInt(range_string);
            }

            locales.minutes.push({ string: string, range: range });
        });

        // Set up conversions => seconds
        results_sorted.seconds.forEach(pair => {
            let string = pair.string.substring(1, pair.string.length - 1);
            let range_string = pair.range.substring(1, pair.range.length - 1);
            let range = {};

            if(range_string.includes('+')) {
                range.max = Infinity;
                range.min = Number.parseInt(range_string.substring(0, range_string.length - 1));
            } else if(range_string.includes('-')) {
                range.min = Number.parseInt(range_string.substring(0, range_string.lastIndexOf('-')));
                range.max = Number.parseInt(range_string.lastIndexOf('-') + 1, range_string.length);
            } else {
                range.min = range.max = Number.parseInt(range_string);
            }

            locales.seconds.push({ string: string, range: range });
        });

        // Set up string parts to pull together
        let parts = [];
        
        if(converted_time.y > 0) {
            let string;
            locales.years.forEach(pair => {
                if(converted_time.y >= pair.range.min && converted_time.y <= pair.range.max) string = pair.string;
            });
            parts.push(`${converted_time.y} ${string}`);
        }
        if(converted_time.m > 0) {
            let string;
            locales.months.forEach(pair => {
                if(converted_time.m >= pair.range.min && converted_time.m <= pair.range.max) string = pair.string;
            });
            parts.push(`${converted_time.m} ${string}`);
        }
        if(converted_time.w > 0) {
            let string;
            locales.weeks.forEach(pair => {
                if(converted_time.w >= pair.range.min && converted_time.w <= pair.range.max) string = pair.string;
            });
            parts.push(`${converted_time.w} ${string}`);
        }
        if(converted_time.d > 0) {
            let string;
            locales.days.forEach(pair => {
                if(converted_time.d >= pair.range.min && converted_time.d <= pair.range.max) string = pair.string;
            });
            parts.push(`${converted_time.d} ${string}`);
        }
        if(converted_time.h > 0) {
            let string;
            locales.hours.forEach(pair => {
                if(converted_time.h >= pair.range.min && converted_time.h <= pair.range.max) string = pair.string;
            });
            parts.push(`${converted_time.h} ${string}`);
        }
        if(converted_time.min > 0) {
            let string;
            locales.minutes.forEach(pair => {
                if(converted_time.min >= pair.range.min && converted_time.min <= pair.range.max) string = pair.string;
            });
            parts.push(`${converted_time.min} ${string}`);
        }
        if(converted_time.s > 0) {
            let string;
            locales.seconds.forEach(pair => {
                if(converted_time.s >= pair.range.min && converted_time.s <= pair.range.max) string = pair.string;
            });
            parts.push(`${converted_time.s} ${string}`);
        }

        // Return formatted string = todo
        return parts.join(", ");
    },

    // Convert time module to miliseconds
    timeToMiliseconds: time_module => {
        let ms = 0;

        ms += time_module.y * literals.time_constants.YEAR;
        ms += time_module.m * literals.time_constants.MONTH;
        ms += time_module.w * literals.time_constants.WEEK;
        ms += time_module.d * literals.time_constants.DAY;
        ms += time_module.h * literals.time_constants.HOUR;
        ms += time_module.min * literals.time_constants.MINUTE;
        ms += time_module.s * literals.time_constants.SECOND;

        return ms;
    }
}
