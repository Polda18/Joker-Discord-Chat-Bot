/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: events/error.js
 *****************************************/

module.exports = {
    name: 'error',
    run: (client, e) => console.error(e.error)
}