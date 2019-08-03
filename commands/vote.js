const Discord = require("discord.js")

const time_parse = require("./inc/time_check.js").time_parse;
const time_str_build = require("./inc/time_check.js").time_str_build;
const time_constants = require("./inc/time_check.js").time_constants;

module.exports.run = async (client, message, args) => {
    // $$vote duration topic => $$vote 1y2m3w4d5h6min7s Roll the dice!

    const vote_yes = (client.current_settings.votepoll_emoji_default)
        ? client.current_settings.votepoll_emoji_base.vote_yes
        : message.guild.emojis.get(client.current_settings.votepoll_emoji_base.vote_yes);
    const vote_no = (client.current_settings.votepoll_emoji_default)
        ? client.current_settings.votepoll_emoji_base.vote_no
        : message.guild.emojis.get(client.current_settings.votepoll_emoji_base.vote_no);

    if(args.length > 1) {
        // At least two arguments stated (last argument can contains spaces)

        let duration_string = args[0];
        let topic = args.slice(1).join(" ");

        // Parse the time
        let error = false;
        let duration = time_parse(duration_string, error);

        // An error occured? Call it done:
        if(error) return await message.channel.send(`\u274C This is not a correct time format, ${message.author}! Refer to \`${client.current_settings.prefix}help vote\` page on the correct time format.`);

        // Count the non-zero time units
        let unit_count = 0;
        for(var key in duration) {
            if(!duration.hasOwnProperty(key)) continue;     // Ignore prototype keys

            if(duration[key] > 0) ++unit_count;             // Increase counter if non-zero key found
        }

        // Check if the count is zero => error
        if(unit_count == 0) return await message.channel.send(`\u274C You cannot specify zero duration, ${message.author}! Refer to \`${client.current_settings.prefix}help vote\` page on the correct time format.`);

        // Build specified time based on the duration
        let specified_time = time_str_build(duration);
        
        // Get an embed
        let embed = new Discord.RichEmbed()
            .setTitle(`Voting has started for: \`${topic}\``)
            .setAuthor(message.author)
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
        let vote_time = (
            duration.y * time_constants.y
            + duration.m * time_constants.m
            + duration.w * time_constants.w
            + duration.d * time_constants.d
            + duration.h * time_constants.h
            + duration.min * time_constants.min
            + duration.s * time_constants.s
        );

        let reactions = await sent.awaitReactions(r => (
            (r.emoji.name === (client.current_settings.votepoll_emoji_default)
                ? client.current_settings.votepoll_emoji_base.vote_yes
                : message.guild.emojis.get(client.current_settings.votepoll_emoji_base.vote_yes).name)
            || (r.emoji.name === (client.current_settings.votepoll_emoji_default)
                ? client.current_settings.votepoll_emoji_base.vote_no
                : message.guild.emojis.get(client.current_settings.votepoll_emoji_base.vote_yes).name)
        ), {time: vote_time});

        // Count reactions
        let agreed = reactions.get(vote_yes).count - 1;     // Minus one, since both of reactions were first added by the bot
        let disagreed = reactions.get(vote_no).count - 1;

        let vote_balanced = agreed == disagreed;
        let most_agreed = agreed > disagreed;
        let most_disagreed = agreed < disagreed;

        let vote_results_text = '';

        if(vote_balanced) vote_results_text = 'Users voted equally';
        if(most_agreed) vote_results_text = 'Most users agreed';
        if(most_disagreed) vote_results_text = 'Most users disagreed';

        // Send vote poll results:
        let vote_results_embed = new Discord.RichEmbed()
            .setTitle(`Vote results for: \`${topic}\``)
            .setAuthor(message.author)
            .setDescription(vote_results_text)
            .addField("Agreed", agreed, true)
            .addField("Disagreed", disagreed, true)
            .setFooter(`Voting has been dispatched for ${specified_time}`)
            .setTimestamp();
        
        return await message.channel.send(vote_results_embed);
    } else {
        // \u274C = red cross emoji
        await message.channel.send(`\u274C One or more arguments are missing, ${message.author}!\nUsage: ${client.current_settings.prefix}vote <duration> <topic>`);
    }
}

module.exports.helper = {
    name: 'vote'
}