/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: main.js
 *****************************************/

// Get the package information
const package = require("./package.json");

// Required libraries
const {
    Client,
    Collection
} = require("discord.js");          // Discord.js library -> main driver for this bot

const MySQL = require("mysql");     // MySQL library -> keeps settings

// Check for local environment variables instead of global system ones
require("dotenv").config({path: `${__dirname}/.env`});

// Import custom number literals for switches and errors
const literals = require("./literals.js");
const functions = require("./functions.js");

// Create Discord client
const client = new Client({disableEveryone: true});

// Setup credentials
client.credentials = {
    token:      process.env.TOKEN,
    mysql: {
        host:   process.env.MYSQL_HOST,
        user:   process.env.MYSQL_USER,
        pswd:   process.env.MYSQL_PSWD,
        db:     process.env.MYSQL_DB
    },
    dbl_token:  process.env.DBL_TOKEN
};

// Setup default settings (later to be completed by MySQL settings)
client.settings = {
    guilds: {
        default: Object.freeze({
            prefix: process.env.DEFAULT_PREFIX,     // Bot prefix. Use this to prefix any content of messages you wish to use as commands
            emotes_settings: Object.freeze({
                voting: Object.freeze({
                    default: true,          // Defines default => will be compared with default guild settings
                    type: 'object',         // Type of the base => for voting emotes shall be always 'object'
                    base: Object.freeze({
                        agree: '\ud83d\udc4d',      // Agreement emote => defaults to Thumbs up emoji (unicode)
                        disagree: '\ud83d\udc4e'    // Disagreement emote -> defaults to Thumbs down emoji (unicode)
                    })
                }),
                diceroll: Object.freeze({
                    default: true,          // Defines default => will be compared with default guild settings
                    type: 'string',         // Type of the base => string for default dice numbers suffix, otherwise array
                    base: '\ufe0f\u20e3'    // Defaults to dice numbers suffix, which is a box for holding a number.
                                            // Number before that defines the emoji to display (keypad unicode emojis)
                                            // Naturally, dice numbers can be only [1-6] (including),
                                            // 60 % of all keypad numbers (full keypad ranges numbers [0-9])
                }),
                coinflip: Object.freeze({
                    default: true,          // Defines default => will be compared with default guild settings
                    type: 'object',         // Type of the base => for coinflip emotes shall be always 'object'
                    base: Object.freeze({
                        heads: '\ud83d\udc78',      // Heads emote => defaults to Princess emoji (unicode)
                        tails: '\ud83e\udd85'       // Tails emote => defaults to Eagle emoji (unicode)
                    })
                })
            }),
            leveling: Object.freeze({
                disabled: false,            // Disables leveling for this guild (defaults to false === enable leveling)
                channel: null,              // Channel to query user levels in (defaults to null === every channel allowed)
                message: "@user has leveled up!"    // Message content of level up message (defaults to generic message)
            }),
            gaming: Object.freeze({         // Settings for server minigame: The Sims, Discord Edition
                disabled: false,            // Disables minigame for this guild (defaults to false === enable minigame)
                channel: null,              // Channel for playing the minigame in (defaults to null === every channel allowed)
                config: Object.freeze({     // Minigame config for this guild
                    enable: Object.freeze({
                        gambling: true,
                        robbing: true,
                        working: true,
                        trading: true,
                        murders: true,
                        education: true,
                        debts: true,
                        bills: true,
                        jail: true,
                        shop: true
                    }),
                    coins: Object.freeze({
                        format: '#1,000.00',
                        currency: '$'
                    }),
                    bills: Object.freeze({
                        electricity: true,
                        heating: true,
                        water: true,
                        television: true,
                        radio: true,
                        accomodation: true,
                        jail: true,
                        education: true
                    })
                })
            }),
            roles: Object.freeze({
                owner: Object.freeze([]),   // Owner roles list (defaults to empty array)
                admin: Object.freeze({
                    chief: null,            // Chief administrator role (defaults to null === none role)
                    channels: Object.freeze({})     // Channel dependent administrator roles list
                                                    // (defaults to empty dictionary === none roles)
                }),
                moderator: Object.freeze({
                    chief: null,            // Chief moderator role (defaults to null === none role)
                    channels: Object.freeze({})     // Channel dependent administrator roles list
                                                    // (defaults to empty dictionary === none roles)
                }),
                developer: Object.freeze([]),       // Developer roles (defaults to empty array)
                muted: Object.freeze({
                    global: null,           // Global role for muted users (muted server-wide)
                                            // Defaults to null === none role
                    channels: Object.freeze({})     // Channel dependent roles for muted users (muted only in that channel)
                                                    // Defaults to empty dictionary === none roles
                }),
                auditlog_channel: null,     // Channel for audit logs of the bot (defaults to null === none channel)
                swearing_filter: Object.freeze([]),     // Swearing filter with list of filtered words
                                                        // (defaults to empty arraz === none words)
                welcomes: Object.freeze({
                    channel: null,          // Channel for posting welcomes into (defaults to null === general/default channel)
                    content: "Welcome @user to @guild, have a great time. \ud83d\udc4d",     // Welcome message content
                                            // (defaults to this ^ ... \ud83d\udc4d === thumbs up unicode emoji)
                    dm: null                // Direct message content (defaults to null === don't post direct messages)
                }),
                farewells: Object.freeze({
                    channel: null,          // Channel for posting farewells into (defaults to null === general/default channel)
                    content: "@user has left. \ud83d\ude25 Live long and prosper. \ud83d\udd96",      // Farewell message content
                                            // (defaults to this ^ ... \ud83d\ude25 === sad face with tear unicode emoji
                                            // \ud83d\udd96 === vulcan gesture /courtesy of StarTrek franchise/ unicode emoji)
                    dm: null                // Direct message content (defaults to null === don't post direct messages)
                })
            })
        })
        // Guild dependent settings will be added programatically by MySQL connection.
    },
    developers: Object.freeze({
        chief: process.env.CHIEF_DEVELOPER,     // The UUID (user unique ID) of the chief developer
        assistants: []                          // Assisting developers of this bot (filled by MySQL connection)
    })
}

// Moderation and leveling activity of the bot
client.activity = Object.freeze({
    moderation: Object.freeze({
        bans: {},       // Bans issued by the bot in every guild
        mutes: {}       // Mutes issued by the bot in every guild
    }),
    other: {
        leveling: {},   // Leveling of users in every guild (keeps settings for disabled leveling)
        gaming: Object.freeze({     // Minigame on server: settings for every guild for every user (keeps settings for disabled)
            working: {},            // Users currently working
            coins: {},              // Current amount of coins of users
            dead: {},               // Users currently dead
            jail: {}                // Users currently in jail
        })
    }
});

// Perform MySQL connection => todo

// Create collections for commands and their aliases
client.commands = new Collection();
client.aliases  = new Collection();

// Create a presence list
client.presenceList = {};

// Get handlers
["command"].forEach(handler => require(`./handlers/${handler}`)(client));

// BEGIN: Events will be moved to upcoming event handler

client.on("ready", () => {
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
    functions.updatePresenceList(client, package);
    functions.setupPresenceTimer(client, package);
});

client.on("guildCreate", async guild => {
    console.log(`Bot joined a new server: \`${guild.name}\`; ID: \`${guild.id}\``);

    // Do presence updates
    functions.updatePresenceList(client, package);
    functions.setupPresenceTimer(client, package);
});

client.on("guildDelete", async guild => {
    console.log(`Bot left a server: \`${guild.name}\`; ID: \`${guild.id}\``);

    // Do presence updates
    functions.updatePresenceList(client, package);
    functions.setupPresenceTimer(client, package);
});

client.on("message", message => {
    // TODO
});

client.on("error", e => console.error(e));

// END: Events

// Login the bot to the Discord service
client.login(client.credentials.token);
