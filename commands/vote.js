const Discord = require("discord.js")

const time_check = require("./inc/time_check.js");

module.exports.run = async (client, message, args) => {
    // $$vote duration topic => $$vote 1y2m3w4d5h6min7s Roll the dice!

    // Let's prepare the time format error message:
    const time_format_error_msg = `\u274C This is not a correct time format, ${message.author}! Refer to \`${client.current_settings.prefix}help vote\` page on the correct time format.`;

    if(args.length > 1) {
        // At least two arguments stated (last argument can contains spaces)

        let duration_string = args[0];
        let topic = args.slice(1).join(" ");

        // Prepare the duration of the vote
        let duration = {
            years: 0,
            months: 0,
            weeks: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }

        // Prepare the constants of the duration time translation for milliseconds:
        let constants = {
            year: 3.1556926e10,
            month: 2.62974383e9,
            week: 604800000,
            day: 86400000,
            hour: 3600000,
            minute: 60000,
            second: 1000
        }

        // Get the timestamp modifiers' positions (correct format is y < m < w < d < h < min < s, since string is read LTR)
        let mods = {
            y: duration_string.search(/y/i),
            m: duration_string.search(/m/i),
            w: duration_string.search(/w/i),
            d: duration_string.search(/d/i),
            h: duration_string.search(/h/i),
            min: duration_string.search(/min/i),
            s: duration_string.search(/s/i)
        };

        // Prepare switches for timestamp modifiers, basic all true;
        let switches = {
            y: true,
            m: true,
            w: true,
            d: true,
            h: true,
            min: true,
            s: true
        }

        // Prepare an error to be checked
        let error = false;
        
        // Check not found timestamp modifiers
        if(mods.y == -1)
            switches.y = false;
        if(mods.m == -1)
            switches.m = false;
        if(mods.w == -1)
            switches.w = false;
        if(mods.d == -1)
            switches.d = false;
        if(mods.h == -1)
            switches.h = false;
        if(mods.min == -1)
            switches.min = false;
        if(mods.s == -1)
            switches.s = false;
        
        // Since 'm' and 'min' start to same letter, 'm' might as well be found in 'min' => months are disabled
        if(mods.m == mods.min)
            switches.m = false;
        
        // Check the correct format: 1y2m3w4d5h6min7s [seconds do not need to end with 's'; no milliseconds]
        error = !time_check(mods, switches);  // Negated, since the 'time_check()' function returns true for success, not failure

        // If an error occured, send a message.
        // if(error)
            return await message.channel.send(time_format_error_msg);
    } else {
        // \u274C = red cross emoji
        await message.channel.send(`\u274C One or more arguments are missing, ${message.author}!\nUsage: ${client.current_settings.prefix}vote <duration> <topic>`);
    }
}

module.exports.helper = {
    name: 'vote'
}