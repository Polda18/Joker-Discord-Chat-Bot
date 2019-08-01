/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: main.js
 *****************************************/

require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const mysql = require("mysql");
const fs = require("fs");

client.credentials = {      // 
    token: process.env.token,
    mysql: {
        host: process.env.mysql_host,
        user: process.env.mysql_user,
        pswd: process.env.mysql_pswd,
        db: process.env.mysql_db
    }
};

client.default_settings = Object.freeze({
    prefix: process.env.default_prefix,
    diceroll_emoji_default: true,
    diceroll_emoji_base: "\uFE0F\u20E3",        // Dice Roll command emoji base of keypads (used as "#\uFE0F\u20E3"
                                                // where # is a digit from 1 to 6 = 6 sides of a dice)
    coinflip_emoji_default: true,
    coinflip_emoji_base: Object.freeze({
        heads: "\uD83D\uDC78",    // Princess Emoji
        tails: "\uD83E\uDD85"     // Eagle Emoji
    }),
    votepoll_emoji_default: true,
    votepoll_emoji_base: Object.freeze({
        vote_yes: "\uD83D\uDC4D",
        vote_no: "\uD83D\uDC4E"
    }),
    roles_set: Object.freeze({
        owner: false,
        admin: false,
        moderator: false,
        developer: false
    })
});

client.current_settings = {     // Subject to change, actually
    prefix: process.env.default_prefix,
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
// const mysql_connection = mysql.createConnection({
//     host     : client.credentials.mysql.host,
//     user     : client.credentials.mysql.user,
//     password : client.credentials.mysql.pswd,
//     database : client.credentials.mysql.db
// });

// mysql_connection.connect();
// mysql_connection.query('SELECT * FROM config_misc', (err, results, fields) => {
//     if(err) return mysql_connection.query('CREATE TABLE config_misc (prefix VARCHAR(20) PRIMARY KEY);', (err, results, fields) => {
//         if(err) throw(err);
//         console.log('Created table "config_misc"...');
//         mysql_connection.query(`INSERT INTO config_misc (prefix) VALUES (${client.default_settings.prefix})`, (err, results, fields) => {
//             if(err) throw(err);
//             console.log(`Successfully inserted "${client.default_settings.prefix}" into 'prefix'.`);
//         });
//     });
    
//     // TODO
// });

client.commands_collection = new Discord.Collection();  // Save commands here

fs.readdir("./commands/", (err, files) => {     // Load different commands with this primitive command handler
    console.log("Loading and registering command files...");
    if(err) console.log(err);

    let jsFiles = files.filter(f => f.split(".").pop() === "js");
    if(jsFiles.length <= 0) return console.log("No commands found or an error occured.");

    jsFiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`Command file "${f}" loaded...`);
        client.commands_collection.set(props.helper.name, props);
        console.log(`Command file "${f}" registered...`);
    });

    console.log("Done...");
});

client.on('ready', () => {
    console.log(`Logged in as "${client.user.tag}" with id "${client.user.id}".`);  // Says when the bot is ready
});

client.on('message', message => {
    if (message.channel.type === "dm" || message.channel.type === "group") return; // ignore direct messages or group dm messages
    
    let prefix = client.current_settings.prefix;
    let msgArray = message.content.split(" ");
    let cmd = msgArray[0];
    let args = msgArray.slice(1);
    let command = client.commands_collection.get(cmd.slice(prefix.length));

    if(command) {
        command.run(client, message, args);
        console.log(`Command ${command.helper.name} has been run by ${message.author.tag} with id ${message.author.id}`);
    }
})

client.login(client.credentials.token);     // Login the bot to the Discord service