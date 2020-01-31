/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: handlers/event.js
 *****************************************/

const colors = require("colors");

const { readdirSync } = require("fs");
const ASCII = require("ascii-table");

let table = new ASCII("Events");
table.setHeading("Event", "Load status");

module.exports = client => {
    const events = readdirSync('./events/').filter(f => f.endsWith('.js'));

    for(let file of events) {
        let pull = require(`../events/${file}`);

        if(pull.name) {
            client.on(pull.name, pull.run.bind(null, client));
            table.addRow(file, 'Okay'.green);
        } else {
            table.addRow(file, 'Not okay'.red);
        }
    }

    console.log(table.toString());
}