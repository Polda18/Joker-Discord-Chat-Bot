/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: diceroll.js
 *****************************************/

module.exports.run = async (client, message, args) => {
    // Math and emoji base preparation: toss a random index in range <0;6) and floor result -> use emoji base
    let random_toss = Math.floor(Math.random() * 6);
    let diceroll_emoji_base = client.current_settings.diceroll_emoji_base;
    let diceroll_emoji_default = client.current_settings.diceroll_emoji_default;
    let return_emoji = "";

    // Check default settings
    if(diceroll_emoji_default) {
        // Default keyboard numpad emojis 1-6
        return_emoji = (random_toss + 1) + diceroll_emoji_base;
    } else {
        // Custom emojis set
        if(typeof diceroll_emoji_base != "object" && typeof diceroll_emoji_base != "array") {
            // Wrong emojis set (probably not gonna happen, but better safe than sorry) => default emojis
            diceroll_emoji_base = client.default_settings.diceroll_emoji_base;
            diceroll_emoji_default = client.default_settings.diceroll_emoji_default;

            return_emoji = (random_toss + 1) + diceroll_emoji_base;
        } else {
            // Right emojis set
            return_emoji = diceroll_emoji_base[random_toss];
        }
    }

    // Now finally toss the dice:
    await message.channel.send(`${message.author}, you tossed a dice:`);
    if(diceroll_emoji_default)
        await message.channel.send(return_emoji);
    else
        await message.channel.send(message.guild.emojis.get(return_emoji));
    
    return;
};

module.exports.helper = {
    name: 'diceroll'
}