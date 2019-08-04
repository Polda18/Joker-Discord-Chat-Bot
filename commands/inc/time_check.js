module.exports.INVALID_FORMAT = 1;
module.exports.INTERNAL_EXCEPTION = 2;

module.exports.time_constants = {
    year: 31556952000,
    month: 2592000000,
    week: 604800000,
    day: 86400000,
    hour: 3600000,
    minute: 60000,
    second: 1000
};

module.exports.time_parse = (duration_string, error) => {
    // Prepare the duration of the vote
    let duration = {
        y: 0,
        m: 0,
        w: 0,
        d: 0,
        h: 0,
        min: 0,
        s: 0
    };

    // Define the regex to complete:
    let timeRegex = /^(?<y>[1-9][0-9]*y)?(?<m>[1-9][0-9]*m)?(?<w>[1-9][0-9]*w)?(?<d>[1-9][0-9]*d)?(?<h>[1-9][0-9]*h)?(?<min>[1-9][0-9]*min)?(?<s>[1-9][0-9]*s?)?$/i;
    
    // Match the string with the regex:
    if(duration_string.match(timeRegex) == null) {      // Regular expression didn't match
        error.r = this.INVALID_FORMAT;    // Set error flag
        return null;        // Return null instead of duration
    }

    let matches = duration_string.match(timeRegex).groups;

    // Check error:
    if(matches === null) {      // If matches are null, call this error
        error.r = this.INTERNAL_EXCEPTION;    // Set error flag
        return null;        // Return null instead of duration
    }

    // Let's count number of successful matches and parse them into our duration structure:
    let matches_count = 0;

    for(key in matches) {
        if(!Object.prototype.hasOwnProperty.call(matches, key)) continue;      // Ignore prototype keys

        if(matches[key] !== undefined) {
            duration[key] = parseInt(matches[key]);     // Parse the matched number to the duration
            if(duration[key] === NaN || duration[key] === null) {    // Number hasn't been parsed - unlikely, but better safe than sorry
                error.r = this.INTERNAL_EXCEPTION;        // Set error flag
                return null;            // Return null instead of duration
            }
            ++matches_count;            // Increase matches count
        }
    }

    // Check if the matches count is above zero:
    if(matches_count == 0) {
        error.r = this.INVALID_FORMAT;    // Set error flag
        return null;        // Return null instead of duration
    }

    // Return the duration
    return duration;
};

module.exports.time_str_build = (duration) => {
    // Let's prepare the individual pieces before joining them...
    let str_pieces_original = [
        (duration.y > 0) ? `${duration.y} year${(duration.y > 1) ? 's' : ''}` : null,
        (duration.m > 0) ? `${duration.m} month${(duration.m > 1) ? 's' : ''}` : null,
        (duration.w > 0) ? `${duration.w} week${(duration.w > 1) ? 's' : ''}` : null,
        (duration.d > 0) ? `${duration.d} day${(duration.d > 1) ? 's' : ''}` : null,
        (duration.h > 0) ? `${duration.h} hour${(duration.h > 1) ? 's' : ''}` : null,
        (duration.min > 0) ? `${duration.min} minute${(duration.min > 1) ? 's' : ''}` : null,
        (duration.s > 0) ? `${duration.s} second${(duration.s > 1) ? 's' : ''}` : null
    ];

    let str_pieces = [];

    // Remove empty strings
    for(i = 0; i < str_pieces_original.length; ++i) {
        if(str_pieces_original[i] != null) str_pieces.push(str_pieces_original[i]);    // If there is an empty string, remove it from the array
    }

    // Build up the concatenated string: '1 year, 2 months, 3 weeks, 4 days, 5 hours, 6 minutes and 7 seconds'
    let time_string = '';

    for(i = 0; i < str_pieces.length; ++i) {
        // Debug
        console.log(str_pieces[i]);

        switch(i) {
            case 0:
                time_string += str_pieces[i];
                break;
            case (str_pieces.length - 1):
                time_string += ` and ${str_pieces[i]}`;
                break;
            default:
                time_string += `, ${str_pieces[i]}`;
        }
    }

    // Return the built concatenated string:
    return time_string;
};