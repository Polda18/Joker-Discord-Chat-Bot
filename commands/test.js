/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: test.js
 *****************************************/

const time_check = require("./inc/time_check.js");

const switch_error = func => {
    return `\u274C No argument for specified switch \`${func}\``;
}

module.exports.run = async (client, message, args) => {
    // TODO: check bot chief developer or developers list to see if the user is actually there

    // Developer checked, check arguments size
    if(args.length <= 0) return await message.reply("Status online");

    // Get the switch
    let func = args[0];
    if(func == '') return await message.reply("Status online");

    switch(func) {
        case 'time':        // Time test clausule
            // This switch expects additional arguments
            if(args.length <= 1) return await message.channel.send(switch_error(func));

            // Get the duration string
            let duration_string = args[1];
            if(duration_string == '') return await message.channel.send("\u274C Empty argument");

            // Resolve duration
            let error = { r: 0 };
            let duration = time_check.time_parse(duration_string, error);

            // Catch any errors
            switch(error.r) {
                case time_check.INTERNAL_EXCEPTION:
                    // \u274C: Red cross mark => error
                    return await message.channel.send("\u274C An internal exception has occured");
                case time_check.INVALID_FORMAT:
                    // \u274C: Red cross mark => error
                    return await message.channel.send("\u274C Invalid format");
                case time_check.TOO_BIG_TIME:
                    // \u2139: Blue i mark => info
                    await message.channel.send("\u2139 One or more of time units overflowed.");
                default:
                    break;
            }

            // Build specified time in concatenated string
            let specified_time = time_check.time_str_build(duration);

            // Build time in milliseconds
            let milliseconds = (
                duration.y * time_check.time_constants.year
                + duration.m * time_check.time_constants.month
                + duration.w * time_check.time_constants.week
                + duration.d * time_check.time_constants.day
                + duration.h * time_check.time_constants.hour
                + duration.min * time_check.time_constants.minute
                + duration.s * time_check.time_constants.second
            );

            // Export the time to the message channel
            return await message.channel.send(`Specified time in built string: ${specified_time}`)
                .then(message.channel.send(`Specified time in milliseconds: ${milliseconds}`))
                .catch(err => {
                    if(err) message.channel.send("\u274C An error occured when sending one of the dispatched messages.");
                });
        case 'status':      // Test status of the bot
            return await message.reply("Status online");
        // More to be added
        default:            // User specified an invalid switch
            return await message.channel.send("\u274C Invalid switch");
    }
};

module.exports.helper = {
    name: 'test'
}