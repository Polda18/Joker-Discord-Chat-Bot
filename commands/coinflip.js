module.exports.run = async (client, message, args) => {
    // Math and emoji base preparation: toss a random index in range <0;2) and floor result -> use emoji base
    let random_toss = Math.floor(Math.random() * 2);
    let coinflip_emoji_base = client.current_settings.coinflip_emoji_base;
    let coinflip_emoji_default = client.current_settings.coinflip_emoji_default;
    let return_emoji = "";

    // Return the emoji base
    switch(random_toss) {
        case 0:
            // Heads
            return_emoji = coinflip_emoji_base.heads;
            break;
        case 1:
            // Tails
            return_emoji = coinflip_emoji_base.tails;
            break;
        default:
            // Illegal toss
            return await message.reply(`An error occured! Please contact developers!`);
    }

    // Finally, flip a coin:
    await message.channel.send(`${message.author}, you flipped a coin:`);

    // Check default settings
    if(coinflip_emoji_default) {
        // Default emojis set => princess and eagle
        await message.channel.send(return_emoji);
    } else {
        await message.channel.send(message.guild.emojis.get(return_emoji));
    }
};

module.exports.helper = {
    name: 'coinflip'
}