const Discord = require("discord.js")

const time_check = require("./inc/time_check.js");

module.exports.run = async (client, message, args) => {
    // $$vote duration topic => $$vote 1y2m3w4d5h6min7s Roll the dice!
    const emojis_default = client.current_settings.votepoll_emoji_default;

    const vote_yes = (emojis_default)
        ? client.current_settings.votepoll_emoji_base.vote_yes
        : message.guild.emojis.get(client.current_settings.votepoll_emoji_base.vote_yes);
    const vote_no = (emojis_default)
        ? client.current_settings.votepoll_emoji_base.vote_no
        : message.guild.emojis.get(client.current_settings.votepoll_emoji_base.vote_no);
    
    const filter = {
        vote_yes: (emojis_default) ? vote_yes : vote_yes.name,
        vote_no: (emojis_default) ? vote_no : vote_no.name
    };

    const get = {
        vote_yes: (emojis_default) ? vote_yes : vote_yes.id,
        vote_no: (emojis_default) ? vote_no : vote_no.id
    }

    if(args.length > 1) {
        // At least two arguments stated (last argument can contains spaces)

        let duration_string = args[0];
        let topic = args.slice(1).join(" ").trim();

        if(duration_string == '' || topic == '') return await message.channel.send(`\u274C Did you really try to cheat me with empty arguments, ${message.author}? Haha, nice try!`);       // \u274C: Red cross mark => error

        // Parse the time
        let error = { r: 0 };       // An object, because I need to change error code directly
        let duration = time_check.time_parse(duration_string, error);

        // An error occured? Call it done:
        switch(error.r) {
            case time_check.INTERNAL_EXCEPTION:
                return await message.channel.send(`\u274C An internal exception has occured, ${message.author}!\nPlease take screenshot of this error and appropriate context and send a bug report to GitHub repository:\nhttps://github.com/Polda18/Joker-Discord-Chat-Bot`);     // \u274C: Red cross mark => error
            case time_check.INVALID_FORMAT:
                return await message.channel.send(`\u274C This is not a correct time format, ${message.author}! Reffer to \`${client.current_settings.prefix}help vote\` page on the correct time format.`);    // \u274C: Red cross mark => error
            case time_check.TOO_BIG_TIME:
                return await message.channel.send(`\u274C You specified too large time span, ${message.author}! Please, reduce some of the time span!`);        // \u274C: Red cross mark => error
            default:
                break;
        }

        // Determine the voting time in milliseconds
        let vote_time = (
            duration.y * time_check.time_constants.year
            + duration.m * time_check.time_constants.month
            + duration.w * time_check.time_constants.week
            + duration.d * time_check.time_constants.day
            + duration.h * time_check.time_constants.hour
            + duration.min * time_check.time_constants.minute
            + duration.s * time_check.time_constants.second
        );

        // Too big time?
        if(vote_time === Infinity || vote_time === NaN) return await message.channel.send(`\u274C The time you specified resulted in too big voting time in milliseconds, ${message.author}! Please reduce some of the time span!`);    // \u274C: Red cross mark => error

        // Build specified time based on the duration
        let specified_time = time_check.time_str_build(duration);
        
        // Get an embed
        let embed = new Discord.RichEmbed()
            .setTitle(`Voting has started for: \`${topic}\``)
            .setColor("RANDOM")
            .setDescription("React with one of these emojis to vote AFTER they both appear!")
            .addField("Yes", vote_yes, true)
            .addField("No", vote_no, true)
            .addField("Started by", message.author)
            .setFooter(`Voting ends in ${specified_time}.`)
            .setTimestamp();
        
        // Send the message and add emojis reaction
        let sent = await message.channel.send(embed);
        await sent.react(vote_yes);
        await sent.react(vote_no);
        
        // Start voting poll
        let reactions = await sent.awaitReactions(
            (r, u) =>  u.id !== client.user.id && [filter.vote_yes, filter.vote_no].includes(r.emoji.name),
            {time: vote_time}
        );

        // Count reactions
        let agreed = (reactions.get(get.vote_yes)) ? reactions.get(get.vote_yes).count - 1 : 0;
        let disagreed = (reactions.get(get.vote_no)) ? reactions.get(get.vote_no).count - 1 : 0;
        // Minus one, since both of reactions were first added by the bot

        // Check if there is zero somewhere
        let zero_agreed = agreed == 0;
        let zero_disagreed = disagreed == 0;

        // Determine the results conditions
        let vote_balanced = agreed == disagreed;
        let most_agreed = agreed > disagreed;
        let most_disagreed = agreed < disagreed;

        // Prepare the results text space
        let vote_results_text;

        // Determine the results text
        if(vote_balanced) vote_results_text = 'Users voted equally.';
        if(most_agreed) vote_results_text = 'Most users agreed.';
        if(most_disagreed) vote_results_text = 'Most users disagreed.';

        // One voting result is zero? Change the results text to reflect that.
        if(zero_agreed) vote_results_text = 'No users agreed.';
        if(zero_disagreed) vote_results_text = 'No users disagreed.';

        // If both votes are zero, no users actually voted, right?
        if(zero_agreed && zero_disagreed) vote_results_text = 'No users voted.';

        // Send vote poll results:
        let vote_results_embed = new Discord.RichEmbed()
            .setTitle(`Vote results for: \`${topic}\``)
            .setDescription(vote_results_text)
            .setColor("RANDOM")
            .addField("Agreed", agreed, true)
            .addField("Disagreed", disagreed, true)
            .addField("Poll started by:", message.author)
            .setFooter(`Voting has been dispatched for ${specified_time}`)
            .setTimestamp();
        
        return await message.channel.send(vote_results_embed);
    } else {
        // \u274C: Red cross mark => error
        await message.channel.send(`\u274C One or more arguments are missing, ${message.author}!\nUsage: \`${client.current_settings.prefix}vote <duration> <topic>\`\nReffer to \`${client.current_settings.prefix}help vote\` page on the correct time format.`);1
    }
}

module.exports.helper = {
    name: 'vote'
}