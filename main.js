/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: main.js
 *****************************************/

// Required libraries
require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const MySQL = require("mysql");
const fs = require("fs");
const Long = require("long");
// const DBL = require("dblapi.js");

// Setup credentials
client.credentials = {
    token: process.env.token,
    mysql: {
        host: process.env.mysql_host,
        user: process.env.mysql_user,
        pswd: process.env.mysql_pswd,
        db: process.env.mysql_db
    },
    dbl_token: process.env.dbl_token
};

// const dbl = new DBL(client.credentials.dbl_token, client);

// Load default settings => deprecated, gonna be replaced by the settings in settings
client.default_settings = Object.freeze({
    prefix: "$$",
    diceroll_emoji_base: "\uFE0F\u20E3",        // Dice Roll command emoji base of keypads (used as "#\uFE0F\u20E3"
                                                // where # is a digit from 1 to 6 = 6 sides of a dice)
    coinflip_emoji_base: Object.freeze({
        heads: "\uD83D\uDC78",    // Princess emoji
        tails: "\uD83E\uDD85"     // Eagle emoji
    }),
    votepoll_emoji_base: Object.freeze({
        vote_yes: "\uD83D\uDC4D",   // Thumbs up emoji
        vote_no: "\uD83D\uDC4E"     // Thumbs down emoji
    })
});

// Current settings as previously saved in MySQL database
client.settings = {
    guilds: {       // Guild dependent settings filled programmatically (mapped by their ids) -> see templates
        default: Object.freeze({  // Default settings for every guild not set specifically
            prefix: "$$",
            votepoll_emotes: Object.freeze({
                default: true,
                base: Object.freeze({
                    vote_yes: "\uD83D\uDC4D",   // Thumbs up emoji
                    vote_no: "\uD83D\uDC4E"     // Thumbs down emoji
                })
            }),
            coinflip_emotes: Object.freeze({
                default: true,
                base: Object.freeze({
                    heads: "\uD83D\uDC78",    // Princess emoji
                    tails: "\uD83E\uDD85"     // Eagle emoji
                })
            }),
            diceroll_emotes: Object.freeze({
                default: true,
                base: "\uFE0F\u20E3"    // Used as "#\uFE0F\u20E3" where # is the number from 1 to 6
            }),
            leveling_disabled: false,
            roles: Object.freeze({
                owner: Object.freeze([]),
                admin: Object.freeze([]),
                moderator: Object.freeze({
                    general: null,
                    channels: Object.freeze({})
                }),
                developer: Object.freeze([]),
                muted: Object.freeze({
                    general: null,
                    channels: Object.freeze({})
                })
            }),
            auditlog_channel: null,
            swearing_words: Object.freeze([]),
            welcomes: Object.freeze({
                channel: "default",
                message: "Welcome @user to @guild, have a great time!",
                dm: null
            }),
            farewells: Object.freeze({
                channel: "default",
                message: "`@user` left our great community. Let's hope he'll come back one time.",
                dm: null
            })
        })
    },
    developers: {   // Developers of this bot
        chief: "370298001597399044",    // Chief developer (master) => fill in your own Discord id for your fork
        helping: []                  // Additional developers list (fill in programatically from mysql database)
    }
};
// Current settings => it needs to be filled by the mysql settings => settings per guild
// Currently not used

// Contact informations
client.contact = {
    email: "marpolda@gmail.com",        // Chief developer contact email
    issue_tracker: "https://github.com/Polda18/Joker-Discord-Chat-Bot/issues",  // Link to issue tracker
    discord_dm: client.fetchUser(client.settings.developers.chief).tag,         // Get the chief developer discord user tag
    websites: "http://czghost.4fan.cz/contact/"          // Developer's sites
};

// Bans and mutes settings per guild
client.bans = {};       // Bans issued in every guild (fill in using data fetched from MySQL database)
client.mutes = {};      // Mutes issued in every guild (fill in using data fetched from MySQL database)

// Users' experiences and levels per guild
client.xp = {};         // Experiences and levels for each user per guild (fill in programatically)

client.current_settings = {     // deprecated => gonna be deleted, refactored and replaced by mysql settings
    prefix: "$$",
    diceroll_emoji_default: true,       // will be false if set to custom
    diceroll_emoji_base: "\uFE0F\u20E3",    // will be list of 6 emoji ids if set to custom
    coinflip_emoji_default: true,       // will be false if set to custom
    coinflip_emoji_base: {              // will be set of 2 emoji ids (heads/tails) if set to custom
        heads: "\uD83D\uDC78",
        tails: "\uD83E\uDD85"
    },
    votepoll_emoji_default: true,
    votepoll_emoji_base: {
        vote_yes: "\uD83D\uDC4D",
        vote_no: "\uD83D\uDC4E"
    },
    roles_set: {
        owner: false,       // If set, that settings will be id of the role
        admin: false,
        moderator: false,
        developer: false
    }
};

// PERFORM A MYSQL CONNECTION == TODO
// client.mysql_connection = MySQL.createConnection({
//     host: client.credentials.mysql.host,
//     user: client.credentials.mysql.user,
//     password: client.credentials.mysql.pswd
// });

// client.mysql_connection.connect();

// Create a collection of bot commands
client.commands_collection = new Discord.Collection();  // Save commands here

// Load different commands with this primitive command handler
fs.readdir("./commands/", (err, files) => {
    console.log("Loading and registering command files...");
    if(err) console.log(err);

    let jsFiles = files.filter(f => f.split(".").pop() === "js");
    if(jsFiles.length <= 0) return console.log("No commands found or an error occured.");

    jsFiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`Command file \`${f}\` loaded...`);
        client.commands_collection.set(props.helper.name, props);
        console.log(`Command file \`${f}\` registered...`);
    });

    console.log("Done...");
});

client.on('error', console.error);

// This will be run when the bot is ready to roll out
client.on('ready', () => {
    console.log(`Logged in as \`${client.user.tag}\` with id \`${client.user.id}\``);  // Says when the bot is ready
});

// Scan a message for triggers
client.on('message', message => {
    if (message.channel.type === "dm" || message.channel.type === "group") return; // Ignore direct messages or group dm messages
    if (message.author.bot) return;     // Ignore messages by bots
    
    let prefix = client.current_settings.prefix;
    let msgArray = message.content.split(" ");
    let cmd = msgArray[0];
    let args = msgArray.slice(1);
    let command = client.commands_collection.get(cmd.slice(prefix.length));

    if(command) {
        command.run(client, message, args);
        console.log(`Command \`${command.helper.name}\` has been run by \`${message.author.tag}\` with id \`${message.author.id}\``);
    } else {
        // TODO: Swearing guard

        // TODO: Experiences
    }
});

client.login(client.credentials.token);     // Login the bot to the Discord service
