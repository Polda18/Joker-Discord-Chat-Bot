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
const DBL = require("dblapi.js");

// Setup credentials
client.credentials = {
    token: process.env.token,
    mysql: {
        host: process.env.mysql_host,
        user: process.env.mysql_user,
        pswd: process.env.mysql_pswd,
        settings_db: process.env.mysql_db_prefix + "settings",
        bans_mutes_db: process.env.mysql_db_prefix + "bans_mutes",
        xp_levels_db: process.env.mysql_db_prefix + "xp_levels"
    },
    dbl_token: process.env.dbl_token
};

const dbl = new DBL(client.credentials.dbl_token, client);

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
            roles: Object.freeze({
                owner: Object.freeze([]),
                admin: Object.freeze([]),
                moderator: Object.freeze([]),
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

const getDefaultChannel = guild => {
    // Get the system channel, if exists
    if(guild.system_channel) return guild.system_channel;

    // Get the original default channel, if exists
    if(guild.channels.has(guild.id)) return guild.channels.get(guild.id);

    // Get the default #general channel, if exists
    let general = guild.channels.find(c => c.name === "general");
    if(general) return general;

    // Get the first writeable channel it finds
    // Beware that this will find any first writeable channel, which may be any if the bot has admin privilieges!
    // It is wise to have one channel named #general in your server for this case. This is really the last hope
    // to thank you for adding it in your server. Since this bot is administrator, the first channel it can write to
    // is literally the first channel it can find.
    return guild.channels.filter(c => c.type === "text" && c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
        .sort((a, b) => a.position - b.position || Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
        .first();;
}

// This will be run when the bot is ready to roll out
client.on('ready', () => {
    console.log(`Logged in as \`${client.user.tag}\` with id \`${client.user.id}\``);  // Says when the bot is ready
});

// Joined a guild? Roll out:
client.on('guildCreate', guild => {
    console.log(`Joined a guild \`${guild.name}\` with id \`${guild.id}\``);

    let join_message = `Hey! Thanks for adding me in! Use \`${client.settings.guilds.default.prefix}help\` to get info on how to use my functions I provide and \`${client.settings.guilds.default.prefix}help settings\` on how to properly save my server dependent settings.`;

    // Get the default channel, usually noted as #general
    let system_channel = getDefaultChannel(guild);
    if(system_channel) await system_channel.send(join_message);

    // Update the settings by adding a new guild to the mysql database
    // TODO: perform a mysql query to update settings in a mysql database

    // TODO: perform a mysql query to update JSON settings from a mysql database
});

// Kicked from a guild? Back up:
client.on('guildDelete', guild => {
    console.log(`Kicked from a guild \`${guild.name}\` with id \`${guild.id}\``);

    let leave_message = {
        intro: `I'm sorry that I have to leave. Did I do something wrong? Please`,
        please: `contact my chief developer`,
        contacts: [],
        outro: `I'm looking forward to see you again`
    };
    if(client.contact.discord_dm) leave_message.contacts.push(`directly on Discord DM to \`${client.contact.discord_dm}\``);
    if(client.contact.email) leave_message.contacts.push(`via e-mail to ${client.contact.email}`);
    if(client.contact.websites) leave_message.contacts.push(`using websites at ${client.contact.websites}`);
    if(client.contact.issue_tracker) leave_message.contacts.push(`send a bug report or another issue to issue tracker at ${client.contact.issue_tracker}`);

    let message = leave_message.intro;
    for(i = 0; i < leave_message.contacts.length; ++i) {
        switch(i) {
            case 0:
                if(
                    leave_message.contacts[i].contains(client.contact.discord_dm)
                    || leave_message.contacts[i].contains(client.contact.email)
                    || leave_message.contacts[i].contains(client.contact.websites)
                ) message += ` ${leave_message.please}`;
                message += ` ${leave_message.contacts[i]}`;
                break;
            case leave_message.contacts.length - 1:
                message += `or ${leave_message.contacts[i]}`;
                break;
            default:
                message += `, ${leave_message.contacts[i]}`;
        }
    }
    message += `. ${leave_message.outro}`;

    return await getDefaultChannel(guild.id).send(message);
});

// Guild changed name? Announce it:
client.on('guildUpdate', (oGuild, nGuild) => {
    if(oGuild.id !== nGuild.id) return;     // Ignore cross guild change (maybe not gonna happen, but better safe than sorry)
    if(oGuild.name !== nGuild.name) {
        console.log(`Guild with id ${oGuild.id} changed name from \`${oGuild.name}\` to \`${nGuild.name}\``);
    }
});

// Member joined? Welcome him!
client.on('guildMemberAdd', member => {
    console.log(`A user \`${member.user.tag}\` with id \`${member.user.id}\` joined guild \`${member.guild.name}\` with id \`${member.guild.id}\``);

    // TODO: Perform a MySQL query and fetch set welcome message for current guild (or retrieve default)
});

// Member left? Farewell him!
client.on('guildMemberRemove', member => {
    console.log(`A user \`${member.user.tag}\` with id \`${member.user.id}\` left guild \`${member.guild.name}\` with id \`${member.guild.id}\``);

    // TODO: Perform a MySQL query and fetch set farewell message for current guild (or retrieve default)
});

// Member received new role? Praise him!
client.on('guildMemberUpdate', member => {
    console.log(`A user \`${member.user.tag}\` with id \`${member.user.id}\` has been updated`);
})

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
