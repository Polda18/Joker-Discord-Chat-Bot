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

const colors = require("colors");   // Colouring the Node.js output
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
})

// Check for local environment variables instead of global system ones
require("dotenv").config({path: `${__dirname}/.env`});

// Import certain functions to be used
const {
    updatePresenceList,
    setupPresenceTimer,
    updatePresenceData
} = require("./functions.js");

// Create Discord client
const client = new Client({disableEveryone: true});

// Assign console colors to the client
client.colors = colors;

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
// Settings is using locale strings. Locale is defined by wrapping content in #locale{} between those brackets {}
// Content inside brackets {} is then path to the locale string. There is nothing allowed before or after locale string.
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
                message: "#locale{leveling:level_up:message}"    // Message content of level up message (defaults to generic message)
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
            auditlog_channel: null,     // Channel for audit logs of the bot (defaults to null === none channel)
            swearing_filter: Object.freeze([]),     // Swearing filter with list of filtered words
                                                    // (defaults to empty arraz === none words)
            welcomes: Object.freeze({
                channel: null,          // Channel for posting welcomes into (defaults to null === general/default channel)
                content: "#locale{welcomes:message}",     // Welcome message content
                                        // (defaults to this ^)
                dm: null                // Direct message content (defaults to null === don't post direct messages)
            }),
            farewells: Object.freeze({
                channel: null,          // Channel for posting farewells into (defaults to null === general/default channel)
                content: "#locale{farewells:message}",      // Farewell message content
                                        // (defaults to this ^)
                dm: null                // Direct message content (defaults to null === don't post direct messages)
            }),
            query: Object.freeze({
                channel: null,              // Restriction to one channel for query (info) commands (defaults to null === every channel)
                imunity: ['ADMINISTRATOR']  // Imunity for certain permissions (defaults to 'ADMINISTRATOR' === server OP)
                                            // Full list of permissions can be accessed here:
                                            // https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
            }),
            locale: 'en-US',                // Locale settings (defaults to 'en-US')
            muting_roles: Object.freeze({
                global: null,               // Global muting role (need to be set in order to mute users)
                channels: Object.freeze({}) // Channel dependent muting roles (defaults to empty dictionary)
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
        warns: {},      // Warns currently issued by the bot in every guild
        bans: {},       // Bans currently issued by the bot in every guild
        mutes: {},      // Mutes currenlty issued by the bot in every guild
        statistics: Object.freeze({
            warns: {},  // User dependent statistics of warns issued by the bot in every guild
            bans: {},   // User dependent statistics of bans issued by the bot in every guild
            kicks: {},  // User dependent statistics of kicks issued by the bot in every guild
            mutes: {}   // User dependent statistics of mutes issued by the bot in every guild
        })
    }),
    other: Object.freeze({
        leveling: {},   // Leveling of users in every guild (keeps settings for disabled leveling)
        gaming: Object.freeze({     // Minigame on server: settings for every guild for every user (keeps settings for disabled)
            working: {},            // Users currently working
            coins: {},              // Current amount of coins of users
            dead: {},               // Users currently dead
            jail: {}                // Users currently in jail
        })
    })
});

// Perform MySQL connection => todo

// Create collections for commands and their aliases
client.commands = new Collection();
client.aliases  = new Collection();

// Create a presence list => currently empty (will be filled by program)
client.presenceList = {};

// Get handlers
["command"].forEach(handler => require(`./handlers/${handler}.js`)(client));

// BEGIN: Events will be moved to upcoming event handler

// Bot logged in event
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
    updatePresenceList(client, package);
    setupPresenceTimer(client);
});

// Bot joined a server event
client.on("guildCreate", async guild => {
    console.log(`Bot joined a new server: \`${guild.name}\`; ID: \`${guild.id}\``);

    // Do presence updates
    updatePresenceList(client, package);
    updatePresenceData(client, 'JOIN');

    console.log(`Presence updated for `)
});

// Bot left a server event (or server was deleted)
client.on("guildDelete", async guild => {
    console.log(`Bot left a server: \`${guild.name}\`; ID: \`${guild.id}\``);

    // Do presence updates
    updatePresenceList(client, package);
    updatePresenceData(client, 'LEAVE');
});

// New message event
client.on("message", async message => {
    // Get prefix from server settings
    let server_id = message.guild.id;           // Get the server ID
    let guild_set = Object.prototype.hasOwnProperty.call(client.settings.guilds, server_id);
    const prefix = guild_set ? client.settings.guilds[server_id].prefix : client.settings.guilds.default.prefix;

    if(message.author.bot) return;              // Ignore bot messages
    if(!message.guild) return;                  // Ignore direct messages
    if(!message.content.startsWith(prefix)) {   // Message doesn't start with prefix? It's not a command, actually
        // Is the bot pinged? Return current command prefix
        if(message.mentions.members.has(message.guild.me.id)) await message.reply(`my prefix for this server is ${prefix}`);

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
});

// Error occured event
client.on("error", e => console.error(e.error));

// END: Events

// Login the bot to the Discord service
client.login(client.credentials.token);
