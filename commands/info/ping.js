/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: commands/info/ping.js
 *****************************************/

const { stripIndents } = require("common-tags");

module.exports = {
    name: 'ping',
    help: {
        description: '#locale{help:ping:description}',
        args: []
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send(`\ud83c\udfd3 Pinging ...`);     // \ud83c\udfd3 = Table-Tenis bat unicode emoji

        return await msg.edit(stripIndents`\ud83c\udfd3 Pong!
        Latency is ${Math.round(msg.createdTimestamp - message.createdTimestamp)} ms
        API ping is ${Math.round(client.ping)} ms`);
    }
}
