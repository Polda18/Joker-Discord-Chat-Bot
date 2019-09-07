/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: handlers/command.js
 *****************************************/

const { readdirSync } = require("fs");
const ASCII = requre("ascii-table");

let table = new ASCII("Commands");
table.setHeading("Command", "Load status");

module.exports = client => {
    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));

        for(let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            if(pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, 'Okay'.green);
            } else {
                table.addRow(file, 'Not a command'.red);
            }

            if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });

    if(commands.map(c => c).length < 1) return console.error('No commands found'.error);
}